// import mongoose from 'mongoose';

// const ipoSchema = new mongoose.Schema(
//   {
//     userId: { type: String, required: true, index: true },
//     userName: String,
//     name: { type: String, required: true, trim: true },
//     applicant: { type: String, required: true, trim: true },
//     type: { type: String, enum: ['MAINBOARD', 'SME'], default: 'MAINBOARD' },
//     exchange: { type: String, enum: ['NSE', 'BSE'], default: 'NSE' },

//     openDate: Date,
//     closeDate: Date,
//     allotmentDate: Date,
//     listingDate: Date,

//     issuePrice: { type: Number, default: 0 },
//     lotSize: { type: Number, default: 1 },
//     lots: { type: Number, default: 1 },
//     gmp: { type: Number, default: 0 },

//     status: {
//       type: String,
//       enum: ['allotted', 'not_allotted'],
//       required: true,
//     },
//     // filled after listing (selling price)
//     listingPrice: { type: Number, default: null },
//   },
//   { timestamps: true, toJSON: { virtuals: true } }
// );

// // profit/loss only for allotted IPOs once listingPrice is known
// ipoSchema.virtual('pnl').get(function () {
//   if (this.status !== 'allotted' || this.listingPrice == null) return null;
//   return (this.listingPrice - this.issuePrice) * this.lotSize * this.lots;
// });

// export default mongoose.model('Ipo', ipoSchema);
import mongoose from 'mongoose';

const ipoSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    userName: String,
    name: { type: String, required: true, trim: true },
    applicant: { type: String, required: true, trim: true },
    type: { type: String, enum: ['MAINBOARD', 'SME'], default: 'MAINBOARD' },
    exchange: { type: String, enum: ['NSE', 'BSE'], default: 'NSE' },

    openDate: Date,
    closeDate: Date,
    allotmentDate: Date,
    listingDate: Date,

    issuePrice: { type: Number, default: 0 },
    lotSize: { type: Number, default: 1 },
    lots: { type: Number, default: 1 },
    gmp: { type: Number, default: 0 },

    // applied -> (allotment day) -> allotted | not_allotted
    status: {
      type: String,
      enum: ['applied', 'allotted', 'not_allotted'],
      default: 'applied',
    },
    listingPrice: { type: Number, default: null },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

ipoSchema.virtual('pnl').get(function () {
  if (this.status !== 'allotted' || this.listingPrice == null) return null;
  return (this.listingPrice - this.issuePrice) * this.lotSize * this.lots;
});

export default mongoose.model('Ipo', ipoSchema);