import sgMail from '@sendgrid/mail';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import { injectable } from 'inversify';

@injectable()
export class MailerService {
    send(params: MailDataRequired) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        return sgMail.send(params);
    }
}
