import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContactSubmission extends Document {
    siteId: mongoose.Types.ObjectId;
    fields: Record<string, string>;
    createdAt: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>({
    siteId: { type: Schema.Types.ObjectId, ref: 'Site', required: true },
    fields: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true });

const ContactSubmission: Model<IContactSubmission> = mongoose.models.ContactSubmission || mongoose.model<IContactSubmission>('ContactSubmission', ContactSubmissionSchema);

export default ContactSubmission;
