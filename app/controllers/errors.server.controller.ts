'use strict';

// TODO
export class ErrorsController {
	/**
	 * Get the error message from error object
	 */
	public getErrorMessage = function (err) {
		var message = 'Something went wrong';

		if (err.code) {
			switch (err.code) {
				case 11000:
				case 11001:
					message = this.getUniqueErrorMessage(err);
					break;
			}
		} else {
			for (var errName in err.errors) {
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
		var output;

		try {
			var fieldName = err.err.substring(err.err.lastIndexOf('.$') + 2, err.err.lastIndexOf('_1'));
			output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';

		} catch (ex) {
			output = 'Unique field already exists';
		}

		return output;
	};
}


