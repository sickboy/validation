import {ValidationConfig} from '../src/validation-config';
import {ValidationGroup} from '../src/validation-group';
import {Container} from 'aurelia-dependency-injection';
import {ValidationSummary} from '../src/validation-summary';
import {Validation} from '../src/validation';

describe('ValidationGroup', () => {
  let subject;
  let validation;
  let validationGroup;
  let validationConfig;
  let container;
  let validationSummary;

  beforeEach(() => {
    subject = { name: 'Test' };
    container = new Container();
    validationConfig = container.get(ValidationConfig);
    validationSummary = container.get(ValidationSummary);
    validation = container.get(Validation);
  });

  describe('when setting an validationSummary', () => {
    it('calls the renderError method', done => {
      validation.config = validationConfig;
      validation.config.setValidationSummary(validationSummary);
      spyOn(validationSummary, 'renderErrors');
      validation = validation.on(subject)
        .ensure('name')
          .isNotEmpty()
      validation.validate();
      setTimeout(() => {
        expect(validationSummary.renderErrors).toHaveBeenCalled();
        done();
      })
    });
  });
});