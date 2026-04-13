import { useState, useMemo } from 'react'
import './App.css'

const PRODUCTS = [
  {
    id: 'p1',
    name: "boAt Rockerz 450 Bluetooth On Ear Headphones",
    price: "1,499",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    description: "Up to 15H Playback, 40mm Dynamic Drivers, Passive Noise Cancellation.",
    initialReviews: [
      { id: 101, user: "Prachi Jha", rating: 5, comment: "Value for money! The bass is punchy and delivery was very fast to Delhi.", date: new Date('2024-02-10'), verified: true, helpful: 42 },
      { id: 102, user: "Param Gupta", rating: 4, comment: "Build quality is decent for the price. Sound is clear but earcups are a bit tight.", date: new Date('2024-02-15'), verified: true, helpful: 15 },
      { id: 103, user: "Rahul S.", rating: 5, comment: "Best entry-level headphones. Battery lasts forever!", date: new Date('2024-03-01'), verified: true, helpful: 8 }
    ]
  },
  {
    id: 'p2',
    name: "Apple iPhone 17 (256 GB) - Black",
    price: "71,290",
    image: "https://www.apple.com/in/iphone-17-pro/images/overview/highlights/highlights_design_endframe__flnga0hibmeu_medium.jpg",
    description: "Introducing iPhone 17 Pro and iPhone 17 Pro Max, designed from the inside out to be the most powerful iPhone models ever made. At the core of the new design is a heat-forged aluminium unibody enclosure that maximises performance, battery capacity and durability.",
    initialReviews: [
      { id: 201, user: "Ananya Verma", rating: 5, comment: "The camera is insane. The night mode shots are professional level.", date: new Date('2024-03-20'), verified: true, helpful: 120 },
      { id: 202, user: "Vikram Rathore", rating: 4, comment: "Premium feel as expected. Switched from Android and the transition was smooth.", date: new Date('2024-03-22'), verified: true, helpful: 56 },
      { id: 203, user: "Siddharth M.", rating: 5, comment: "Apple never fails with the display quality. Pricey but worth it.", date: new Date('2024-03-25'), verified: true, helpful: 30 }
    ]
  },
  {
    id: 'p3',
    name: "Realme Earbuds - Lavender",
    price: "2,500",
    image: "https://image01.realme.net/general/20250319/17423666422538259f42631e44a28ac01c5d18847489b.jpg",
    description: "realme Buds T200 Lite Bluetooth in Ear Earbuds,4 Mic, AI ENC for Calls,48 Hours Total Playback with Fast Charging and Low Latency Gaming TWS,Google Fast Pair, with mic (Volt Lavender)",
    initialReviews: [
      { id: 301, user: "Sneha Kapur", rating: 4, comment: "The Lavender color looks so aesthetic! ANC is decent for the price.", date: new Date('2024-01-05'), verified: true, helpful: 22 },
      { id: 302, user: "Arjun Mehra", rating: 3, comment: "Mic quality is average during outdoor calls. Good for music though.", date: new Date('2024-01-12'), verified: true, helpful: 9 },
      { id: 303, user: "Riya Phadke", rating: 5, comment: "Super comfortable for long gym sessions. Connectivity is instant.", date: new Date('2024-02-18'), verified: true, helpful: 14 }
    ]
  },
  {
    id: 'p4',
    name: "Fastrack Smart Watch - Baby Pink",
    price: "1,999",
    image: "https://m.media-amazon.com/images/I/61L5OyhAXrL._SY355_.jpg",
    description: "Ninja Call Pro Bluetooth Calling Smart Watch, 1.69″ HD Display, Dual Chip,AI Voice Assistant, 120+ Sports Modes, SpO2 & Heart Rate Monitor, Fitness Tracker Smartwatch for Men & Women - Pink",
    initialReviews: [
      { id: 401, user: "Ishita Bose", rating: 5, comment: "Perfect gift for my sister. The step tracking is quite accurate.", date: new Date('2024-03-05'), verified: true, helpful: 18 },
      { id: 402, user: "Karan Johar", rating: 4, comment: "The screen brightness is good even under direct sunlight. UI is lag-free.", date: new Date('2024-03-10'), verified: true, helpful: 7 },
      { id: 403, user: "Pooja Hegde", rating: 2, comment: "The sleep tracker gives weird data sometimes. Hope a software update fixes it.", date: new Date('2024-03-15'), verified: true, helpful: 31 }
    ]
  },
];

function App() {
  const [currentProduct, setCurrentProduct] = useState(PRODUCTS[0]);
  
  // State for all reviews, structured by product ID
  const [allReviews, setAllReviews] = useState(() => {
    const initial = {};
    PRODUCTS.forEach(p => initial[p.id] = p.initialReviews);
    return initial;
  });

  const [newReview, setNewReview] = useState({ user: '', rating: 5, comment: '' });

  // Current reviews derived from state based on active product
  const reviews = allReviews[currentProduct.id];

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.user || !newReview.comment) return;

    const reviewToAdd = { 
      ...newReview, 
      id: Date.now(), 
      date: new Date(), 
      verified: false, 
      helpful: 0 
    };

    setAllReviews({
      ...allReviews,
      [currentProduct.id]: [reviewToAdd, ...reviews]
    });
    
    setNewReview({ user: '', rating: 5, comment: '' });
  };

  const markHelpful = (id) => {
    setAllReviews({
      ...allReviews,
      [currentProduct.id]: reviews.map(r => r.id === id ? { ...r, helpful: r.helpful + 1 } : r)
    });
  };

  return (
    <div className="india-store-container">
      <div className="top-nav">
        <span>Deliver to: <strong>Prayagraj 211003</strong></span>
        <div className="product-selector">
          <span>Change Product: </span>
          <select onChange={(e) => setCurrentProduct(PRODUCTS.find(p => p.id === e.target.value))}>
            {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
      </div>

      <header className="product-showcase">
        <div className="img-container">
          <img src={currentProduct.image} alt={currentProduct.name} />
        </div>
        <div className="details">
          <h1 className="product-title">{currentProduct.name}</h1>
          <div className="rating-row">
            <span className="star-badge">
              {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)} ★
            </span>
            <span className="rev-count">{reviews.length} ratings</span>
          </div>
          <hr />
          <div className="price-section">
            <span className="curr">₹</span>
            <span className="amt">{currentProduct.price}</span>
            <span className="tax-info">M.R.P. (Inclusive of all taxes)</span>
          </div>
          <p className="description">{currentProduct.description}</p>
        </div>
      </header>

      <div className="layout-grid">
        <aside className="left-panel">
          <div className="review-stat-card">
            <h3>Customer Reviews</h3>
            {[5, 4, 3, 2, 1].map(n => {
              const count = reviews.filter(r => r.rating === n).length;
              const percent = (count / reviews.length) * 100;
              return (
                <div className="bar-wrapper" key={n}>
                  <span>{n} star</span>
                  <div className="progress-bg">
                    <div className="progress-fill" style={{width: `${percent}%`}}></div>
                  </div>
                </div>
              );
            })}
          </div>

          <form className="write-review-card" onSubmit={handleAddReview}>
            <h4>Review this product</h4>
            <input placeholder="Your Name" value={newReview.user} onChange={e => setNewReview({...newReview, user: e.target.value})} required />
            <select value={newReview.rating} onChange={e => setNewReview({...newReview, rating: Number(e.target.value)})}>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Poor</option>
              <option value="1">1 - Terrible</option>
            </select>
            <textarea placeholder="Write about sound quality, battery, etc." value={newReview.comment} onChange={e => setNewReview({...newReview, comment: e.target.value})} required />
            <button type="submit" className="yellow-btn">Submit Review</button>
          </form>
        </aside>

        <section className="review-feed">
          <h3>Top reviews from India</h3>
          {reviews.length === 0 ? (
            <p>No reviews for this product yet.</p>
          ) : (
            reviews.map(rev => (
              <div key={rev.id} className="indian-review-card">
                <div className="user-profile">
                  <div className="avatar">{rev.user[0]}</div>
                  <span className="name">{rev.user}</span>
                </div>
                <div className="rating-info">
                  <span className="stars">{'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}</span>
                  <span className="v-purchase">{rev.verified ? 'Verified Purchase' : ''}</span>
                </div>
                <p className="comment">{rev.comment}</p>
                <div className="actions">
                  <button onClick={() => markHelpful(rev.id)}>Helpful ({rev.helpful})</button>
                  <span>|</span>
                  <button>Report</button>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  )
}

export default App