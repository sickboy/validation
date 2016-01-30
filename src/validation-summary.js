/*
* An abstract base class for implementations of an ValidationSummary class. This should be generic enough to be used on both the client and the server.
*/
export class ValidationSummary {
  /*
   * attachToNode - This function is implemented by templating-validation in order to display errors for the end-user.
   * @param node : Element - This is the node which the validation-group is attached to.
   * @param validationGroup : ValidationGroup - This is the group of validations to run against the value of this node.
   * @return val : Boolean - This returns true for successful attaching of validation-group and false otherwise.
   */
  renderErrors(result: ValidationResult): boolean {
    throw new Error('Error rendering enabled but but an ValidationSummary was not supplied!');
  }
}
