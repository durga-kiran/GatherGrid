
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CheckCircle,
  CreditCard,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import bookingService from "../../services/bookingService";
import paymentService from "../../services/paymentServices.js";
import Loading from "../../components/common/Loading";

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  // Fetch booking details
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);

        const response = await bookingService.getBookingById(bookingId);
        const bookingData = response.booking || response;

        if (!bookingData?._id) {
          throw new Error("Invalid booking details received.");
        }

        setBooking(bookingData);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Unable to load booking details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  // Handle mock payment
  const handleMockPayment = async (outcome) => {
    if (paying || !booking) return;

    if (booking.bookingStatus === "cancelled") {
      toast.error("This booking has been cancelled.");
      return;
    }

    if (booking.paymentStatus === "paid") {
      toast.info("This booking has already been paid.");
      return;
    }

    try {
      setPaying(true);

      // Step 1: Create mock payment session
      const orderResponse =
        await paymentService.createPaymentOrder(bookingId);

      if (!orderResponse.success || !orderResponse.payment?.id) {
        throw new Error(
          orderResponse.message || "Unable to create payment session."
        );
      }

      const paymentId = orderResponse.payment.id;

      // Step 2: Complete mock payment
      const result = await paymentService.completeMockPayment(
        paymentId,
        outcome
      );

      // Step 3: Handle successful payment
      if (outcome === "success") {
        if (result.success === true && result.verified === true) {
          toast.success("Payment completed successfully!");

          navigate(`/booking-confirmation/${bookingId}`, {
            replace: true,
          });

          return;
        }

        throw new Error(
          result.message || "Payment verification failed."
        );
      }

      // Step 4: Handle failed payment
      toast.error(result.message || "Payment failed. Please try again.");

      // Refresh booking details
      const refreshedResponse =
        await bookingService.getBookingById(bookingId);

      setBooking(refreshedResponse.booking || refreshedResponse);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong during payment."
      );
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!booking) {
    return (
      <div className="payment-page">
        <div className="payment-card">
          <h2>Booking Not Found</h2>
          <p>We couldn't retrieve your booking details.</p>

          <button onClick={() => navigate("/my-bookings")}>
            Go to My Bookings
          </button>
        </div>
      </div>
    );
  }

  // Calculate ticket quantity
  const totalTickets = booking.tickets?.reduce(
    (total, ticket) => total + Number(ticket.quantity || 0),
    0
  ) || booking.quantity || 0;

  const isPaid = booking.paymentStatus === "paid";
  const isCancelled = booking.bookingStatus === "cancelled";

  const formatPrice = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  return (
    <div className="payment-page">
      <div className="payment-container">

        {/* Page Heading */}
        <div className="payment-heading">
          <span className="payment-eyebrow">
            SECURE CHECKOUT
          </span>

          <h1>Complete Your Payment</h1>

          <p>
            Review your booking details and complete the payment.
          </p>
        </div>

        <div className="payment-grid">

          {/* Payment Section */}
          <div className="payment-card">

            <div className="payment-card-heading">
              <CreditCard size={22} />
              <h2>Payment Method</h2>
            </div>

            {/* Mock Payment Notice */}
            <div className="mock-payment-notice">
              <ShieldCheck size={20} />

              <div>
                <strong>Development Payment Mode</strong>

                <p>
                  This is a simulated payment for testing your
                  Venuza application. No real money will be charged.
                </p>
              </div>
            </div>

            {/* Payment Status */}
            {isPaid ? (
              <div className="payment-status success">
                <CheckCircle size={24} />

                <div>
                  <strong>Payment Already Completed</strong>
                  <p>Your booking has been confirmed.</p>

                  <button
                    className="mock-success-button"
                    onClick={() =>
                      navigate(`/booking-confirmation/${bookingId}`)
                    }
                  >
                    View Confirmation
                  </button>
                </div>
              </div>
            ) : isCancelled ? (
              <div className="payment-status failed">
                <XCircle size={24} />

                <div>
                  <strong>Booking Cancelled</strong>
                  <p>Payment is unavailable for this booking.</p>
                </div>
              </div>
            ) : (
              <>
                <h3 className="mock-payment-title">
                  Choose a Payment Outcome
                </h3>

                <p className="mock-payment-description">
                  Select an option below to test your payment flow.
                </p>

                {/* Successful Payment */}
                <button
                  type="button"
                  className="mock-success-button"
                  disabled={paying}
                  onClick={() => handleMockPayment("success")}
                >
                  {paying
                    ? "Processing..."
                    : "Simulate Successful Payment"}
                </button>

                {/* Failed Payment */}
                <button
                  type="button"
                  className="mock-failure-button"
                  disabled={paying}
                  onClick={() => handleMockPayment("failed")}
                >
                  {paying
                    ? "Processing..."
                    : "Simulate Failed Payment"}
                </button>
              </>
            )}
          </div>

          {/* Booking Summary */}
          <div className="payment-card booking-summary">

            <h2>Booking Summary</h2>

            <div className="booking-summary-event">
              <h3>
                {booking.event?.title || "Event"}
              </h3>

              <p>
                {booking.event?.venue || ""}
                {booking.event?.location
                  ? `, ${booking.event.location}`
                  : ""}
              </p>
            </div>

            {/* Booking Reference */}
            <div className="summary-row">
              <span>Booking Reference</span>

              <strong>
                {booking.bookingReference || booking.bookingId || "N/A"}
              </strong>
            </div>

            {/* Ticket Count */}
            <div className="summary-row">
              <span>Total Tickets</span>
              <strong>{totalTickets}</strong>
            </div>

            {/* Ticket Details */}
            {booking.tickets?.map((ticket, index) => (
              <div className="summary-row" key={index}>
                <span>
                  {ticket.ticketName} × {ticket.quantity}
                </span>

                <strong>
                  {formatPrice(
                    ticket.price * ticket.quantity
                  )}
                </strong>
              </div>
            ))}

            {/* Subtotal */}
            <div className="summary-row">
              <span>Subtotal</span>

              <strong>
                {formatPrice(booking.subtotal)}
              </strong>
            </div>

            {/* Tax */}
            <div className="summary-row">
              <span>Tax</span>

              <strong>
                {formatPrice(booking.tax)}
              </strong>
            </div>

            {/* Convenience Fee */}
            <div className="summary-row">
              <span>Convenience Fee</span>

              <strong>
                {formatPrice(booking.convenienceFee)}
              </strong>
            </div>

            {/* Total */}
            <div className="summary-total">
              <span>Total Amount</span>

              <strong>
                {formatPrice(booking.totalAmount)}
              </strong>
            </div>

            {/* Security Notice */}
            <p className="payment-security-note">
              <ShieldCheck size={16} />

              Mock payment mode — no actual transaction takes place.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
