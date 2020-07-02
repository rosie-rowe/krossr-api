'use strict';

import { KrossrErrorResponse } from '../KrossrResponse/KrossrErrorResponse';

export class ErrorHandler {
    public sendClientErrorResponse(res: KrossrErrorResponse, err: string) {
        return this.sendErrorResponse(res, err, 400);
    }

    public sendErrorResponse(res: KrossrErrorResponse, err: string, statusCode: number) {
        return res.status(statusCode).send({
            message: err
        });
    }

    /**
     * Get the error message from error object
     */
    public getErrorMessage = (err) => {
        let message = 'Something went wrong';

        if (err.code) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = this.getUniqueErrorMessage(err);
                    break;
            }
        } else {
            for (let errName in err.errors) {
                if (err.errors[errName].message) {
                    message = err.errors[errName].message;
                }
            }
        }

        return message;
    }

    /**
     * Get unique error field name
     */
    private getUniqueErrorMessage(err) {
        let output;

        try {
            let fieldName = err.err.substring(err.err.lastIndexOf('.$') + 2, err.err.lastIndexOf('_1'));
            output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';

        } catch (ex) {
            output = 'Unique field already exists';
        }

        return output;
    }
}


