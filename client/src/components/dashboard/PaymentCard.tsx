import React from 'react';

interface Purchase {
  type: 'Ticket' | 'Card';
  date: string;
}

interface PaymentCardProps {
  purchases: Purchase[];
}

const PaymentCard: React.FC<PaymentCardProps> = ({ purchases }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {purchases.length > 0 ? (
        purchases.map((purchase, index) => (
          <div
            key={index}
            className={`border rounded-lg shadow-lg p-4 grid grid-cols-3 ${purchase.type === 'Card' ? 'bg-primary' : 'bg-secondary'} text-white`}
          >
            <div className='col-span-2'>
              <h2 className='text-lg font-bold mb-4'>You bought a: {purchase.type === 'Card' ? "Card" : 'Ticket'} </h2>
              <p><strong>Type:</strong> {purchase.type}</p>
              <p><strong>Date:</strong> {purchase.date}</p>
            </div>
            <div>
              <img src='https://cdn-icons-png.freepik.com/512/8831/8831443.png?uid=R100586331&ga=GA1.1.328462767.1719580284' alt="Payments" className="w-24 h-24 object-cover" />
            </div>
          </div>
        ))
      ) : (
        <p>No purchases made yet.</p>
      )}
    </div>
  );
};

export default PaymentCard;