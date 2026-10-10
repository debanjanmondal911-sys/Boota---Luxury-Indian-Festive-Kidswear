import React, { useState } from 'react';
import {
  X,
  Download,
  MessageCircle,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  Ban,
} from 'lucide-react';
import { Order } from '../../types/account';

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onCancelOrder: (orderId: string) => void;
  onInitiateReturn: (order: Order) => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  isOpen,
  onClose,
  order,
  onCancelOrder,
  onInitiateReturn,
}) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  if (!isOpen || !order) return null;

  const handleDownloadInvoice = () => {
    // Generate clean printable receipt
    const invoiceWindow = window.open('', '_blank');
    if (!invoiceWindow) return;

    const itemsHtml = order.items
      .map(
        (it) => `
      <tr style="border-bottom: 1px solid #E8DADD;">
        <td style="padding: 12px 0;">
          <strong>${it.name}</strong><br/>
          <span style="font-size: 12px; color: #6F6265;">Color: ${it.color} · Size: ${it.size} · SKU: ${it.sku}</span>
        </td>
        <td style="padding: 12px 0; text-align: center;">${it.quantity}</td>
        <td style="padding: 12px 0; text-align: right;">₹${it.price}</td>
        <td style="padding: 12px 0; text-align: right; font-weight: 600;">₹${it.price * it.quantity}</td>
      </tr>
    `
      )
      .join('');

    invoiceWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Tax Invoice - ${order.orderNumber} - Boota</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #2B2224; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.5; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #962949; padding-bottom: 20px; }
            .logo { font-size: 32px; font-weight: bold; color: #962949; font-family: Georgia, serif; }
            .badge { display: inline-block; padding: 4px 8px; background: #FAF6F4; border: 1px solid #E8DADD; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; margin-top: 24px; font-size: 13.5px; }
            th { text-align: left; border-bottom: 2px solid #2B2224; padding-bottom: 8px; font-size: 12px; text-transform: uppercase; }
            .totals { width: 300px; margin-left: auto; margin-top: 24px; font-size: 13.5px; }
            .totals div { display: flex; justify-content: space-between; padding: 4px 0; }
            .total-row { font-weight: bold; font-size: 16px; border-top: 2px solid #2B2224; padding-top: 8px; color: #962949; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E8DADD; font-size: 12px; color: #6F6265; text-align: center; }
            @media print {
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div style="text-align: right; margin-bottom: 16px;">
            <button onclick="window.print()" style="background: #962949; color: white; border: none; padding: 8px 16px; font-weight: bold; cursor: pointer; border-radius: 4px;">Print / Save as PDF</button>
          </div>
          <div class="header">
            <div>
              <div class="logo">Boota</div>
              <div style="font-size: 12px; color: #6F6265; margin-top: 4px;">Luxury Indian Festive Kidswear<br/>GSTIN: 07AAACB1234F1Z6</div>
            </div>
            <div style="text-align: right;">
              <h2 style="margin: 0; font-size: 20px;">TAX INVOICE</h2>
              <div style="font-size: 13px; margin-top: 4px;">Invoice: <strong>INV-${order.orderNumber}</strong></div>
              <div style="font-size: 13px; color: #6F6265;">Date: ${order.date}</div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; margin-top: 24px; font-size: 13px;">
            <div>
              <strong style="text-transform: uppercase; font-size: 11px; color: #6F6265;">Billed &amp; Shipped To:</strong>
              <div style="font-weight: 600; margin-top: 4px;">${order.shippingAddress.name}</div>
              <div>${order.shippingAddress.line1}</div>
              ${order.shippingAddress.line2 ? `<div>${order.shippingAddress.line2}</div>` : ''}
              <div>${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}</div>
              <div>Phone: ${order.shippingAddress.phone}</div>
            </div>
            <div style="text-align: right;">
              <strong style="text-transform: uppercase; font-size: 11px; color: #6F6265;">Order Details:</strong>
              <div style="margin-top: 4px;">Order ID: <strong>#${order.orderNumber}</strong></div>
              <div>Payment: <strong>${order.paymentMethod} (${order.isPrepaid ? 'Paid' : 'Pending'})</strong></div>
              <div>Carrier: ${order.carrier} (${order.trackingNumber})</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Item Description</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Unit Price</th>
                <th style="text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div class="totals">
            <div><span>Subtotal:</span><span>₹${order.subtotal}</span></div>
            ${order.discount > 0 ? `<div><span>Festive Discount:</span><span>-₹${order.discount}</span></div>` : ''}
            <div><span>Doorstep Express Shipping:</span><span>₹${order.shipping === 0 ? 'FREE' : order.shipping}</span></div>
            <div><span>Taxes (Included):</span><span>GST @ 12%</span></div>
            <div class="total-row"><span>Total Paid:</span><span>₹${order.total}</span></div>
          </div>

          <div class="footer">
            Thank you for celebrating with Boota. Handcrafted with love in Jaipur, India.<br/>
            Concierge Support: concierge@boota.in | WhatsApp: +91 72919 47002
          </div>
        </body>
      </html>
    `);
    invoiceWindow.document.close();
  };

  const getStatusColor = (st: string) => {
    switch (st) {
      case 'Delivered':
        return 'bg-[#EBF7ED] text-[#2E7D32] border-[#C8E6C9]';
      case 'Shipped':
      case 'Out for Delivery':
        return 'bg-[#E8F0FE] text-[#1967D2] border-[#D2E3FC]';
      case 'Packed':
      case 'Confirmed':
        return 'bg-[#FFF8E1] text-[#B78103] border-[#FFE082]';
      case 'Cancelled':
        return 'bg-[#FDEDED] text-[#B71C1C] border-[#F8B4B4]';
      default:
        return 'bg-[#FAF6F4] text-[#6F6265] border-[#E8DADD]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#2B2224]/65 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 md:p-6">
        <div className="relative w-full max-w-2xl bg-[#FFFDF9] border border-[#E8DADD] rounded-[6px] shadow-2xl overflow-hidden my-6">
          {/* Header */}
          <div className="bg-[#FFFFFF] border-b border-[#E8DADD] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="font-serif text-[22px] font-semibold text-[#2B2224]">
                Order #{order.orderNumber}
              </h3>
              <span
                className={`px-2.5 py-0.5 rounded-[4px] text-[11px] font-semibold tracking-wide border uppercase ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#6F6265] hover:text-[#2B2224] rounded-full hover:bg-[#F9F5F6] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF6F4] p-3.5 rounded-[4px] border border-[#E8DADD]">
              <div className="text-[13px] text-[#6F6265]">
                Placed on: <strong className="text-[#2B2224]">{order.date}</strong>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadInvoice}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E8DADD] hover:border-[#962949] text-[#2B2224] hover:text-[#962949] rounded-[4px] text-[12px] font-medium transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Download Tax Invoice
                </button>
                <a
                  href={`https://wa.me/917291947002?text=${encodeURIComponent(
                    `Hi Boota Concierge, I need help with Order #${order.orderNumber}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-[4px] text-[12px] font-medium transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Need Help
                </a>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="border border-[#E8DADD] bg-white rounded-[4px] p-5">
              <h4 className="font-serif font-semibold text-[17px] text-[#2B2224] mb-3 flex items-center justify-between">
                <span>Live Delivery Tracking</span>
                {order.carrier && (
                  <span className="text-[12px] font-normal text-[#6F6265]">
                    Carrier: {order.carrier} · AWB: {order.trackingNumber}
                  </span>
                )}
              </h4>

              <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8DADD]">
                {order.trackingTimeline.map((ev, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        ev.completed
                          ? 'border-[#962949] bg-[#962949] text-white'
                          : 'border-[#E8DADD] bg-white'
                      }`}
                    >
                      {ev.completed && <CheckCircle2 className="w-2.5 h-2.5" />}
                    </div>
                    <div className="text-[13px]">
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-semibold ${
                            ev.completed ? 'text-[#2B2224]' : 'text-[#A09598]'
                          }`}
                        >
                          {ev.status}
                        </span>
                        <span className="text-[11.5px] text-[#6F6265]">{ev.timestamp}</span>
                      </div>
                      <p className="text-[#6F6265] text-[12.5px] mt-0.5">{ev.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items List */}
            <div className="border border-[#E8DADD] bg-white rounded-[4px] p-5">
              <h4 className="font-serif font-semibold text-[17px] text-[#2B2224] mb-3">
                Items ({order.items.length})
              </h4>
              <div className="divide-y divide-[#E8DADD]">
                {order.items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center gap-4 first:pt-0 last:pb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded-[3px] border border-[#E8DADD]"
                    />
                    <div className="flex-1 text-[13.5px]">
                      <h5 className="font-semibold text-[#2B2224]">{item.name}</h5>
                      <p className="text-[#6F6265] text-[12.5px]">
                        Color: {item.color} · Size: <span className="font-medium text-[#2B2224]">{item.size}</span>
                      </p>
                      <p className="text-[#6F6265] text-[12px]">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-[#962949] text-[14px]">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Amounts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Shipping Address */}
              <div className="border border-[#E8DADD] bg-white rounded-[4px] p-4 text-[13px]">
                <h5 className="font-serif font-semibold text-[15px] text-[#2B2224] mb-2">
                  Delivery Address
                </h5>
                <div className="text-[#6F6265] space-y-0.5">
                  <p className="font-semibold text-[#2B2224]">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.line1}</p>
                  {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
                    {order.shippingAddress.pincode}
                  </p>
                  <p className="pt-1">Phone: {order.shippingAddress.phone}</p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border border-[#E8DADD] bg-white rounded-[4px] p-4 text-[13px] space-y-2">
                <h5 className="font-serif font-semibold text-[15px] text-[#2B2224] mb-2">
                  Payment Summary
                </h5>
                <div className="flex justify-between text-[#6F6265]">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-[#2E7D32]">
                    <span>Festive Discount</span>
                    <span>-₹{order.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6F6265]">
                  <span>Shipping</span>
                  <span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span>
                </div>
                <div className="border-t border-[#E8DADD] pt-2 flex justify-between font-semibold text-[#2B2224] text-[14px]">
                  <span>Total Paid ({order.paymentMethod})</span>
                  <span className="text-[#962949]">₹{order.total}</span>
                </div>
              </div>
            </div>

            {/* Cancel Modal / Return Actions */}
            {order.cancellable && order.status === 'Confirmed' && (
              <div className="border border-[#F8B4B4] bg-[#FFF5F5] rounded-[4px] p-4 text-[13px]">
                {!showCancelConfirm ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[#B71C1C]">Need to cancel this order?</p>
                      <p className="text-[#6F6265]">
                        You can cancel anytime before packing begins. Automatic 100% refund to your original source.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowCancelConfirm(true)}
                      className="py-2 px-4 bg-white border border-[#B71C1C] text-[#B71C1C] hover:bg-[#B71C1C] hover:text-white font-semibold rounded-[4px] transition-colors cursor-pointer shrink-0"
                    >
                      Cancel Order
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="font-semibold text-[#B71C1C] flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Are you sure you want to cancel Order #{order.orderNumber}?
                    </p>
                    <p className="text-[#2B2224]">
                      Prepaid refund of <strong>₹{order.total}</strong> will be immediately initiated to your {order.paymentMethod} account and typically reflects in 3-5 business days.
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => {
                          onCancelOrder(order.id);
                          setShowCancelConfirm(false);
                          onClose();
                        }}
                        className="py-2 px-4 bg-[#B71C1C] hover:bg-[#911414] text-white font-semibold rounded-[4px] transition-colors cursor-pointer"
                      >
                        Yes, Cancel Order &amp; Refund ₹{order.total}
                      </button>
                      <button
                        onClick={() => setShowCancelConfirm(false)}
                        className="py-2 px-4 border border-[#E8DADD] hover:bg-white text-[#2B2224] rounded-[4px] cursor-pointer"
                      >
                        Nevermind
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Return / Exchange Trigger Button */}
            {order.status === 'Delivered' && order.returnEligible && (
              <div className="border border-[#E8DADD] bg-[#FFF9FA] rounded-[4px] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h5 className="font-semibold text-[#962949] flex items-center gap-1.5">
                    <RotateCcw className="w-4 h-4" /> Need a different size or wish to return?
                  </h5>
                  <p className="text-[12.5px] text-[#6F6265]">
                    Our 100% self-service portal takes under 2 minutes. Free doorstep pickup &amp; instant exchange.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onInitiateReturn(order);
                  }}
                  className="py-2.5 px-5 bg-[#962949] hover:bg-[#7D223C] text-white font-semibold text-[13px] tracking-wide uppercase rounded-[4px] transition-colors cursor-pointer shrink-0"
                >
                  Return or Exchange
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
