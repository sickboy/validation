import {ValidationConfig} from '../src/validation-config';
import {Container} from 'aurelia-dependency-injection';
import {ValidationSummary} from '../src/validation-summary';

describe('ValidationConfig', () => {
  it('should have default values', () => {
    var config = new ValidationConfig();
    expect(config.getDebounceTimeout()).toBe(0);
    expect(config.getDependencies().length).toBe(0);
    expect(config.getValue('locale')).toBe('en-US');
    expect(config.getValue('allPropertiesAreMandatory')).toBe(false);
  });

  it('should be configurable (API check)', () => {
    var config = new ValidationConfig();
    expect(config.useDebounceTimeout(50)).toBe(config); //fluent API check
    expect(config.getDebounceTimeout()).toBe(50);

    config = new ValidationConfig();
    expect(config.computedFrom('abc')).toBe(config); //fluent API check
    expect(config.getDependencies()[0]).toBe('abc');

    config = new ValidationConfig();
    expect(config.computedFrom(['abc','def'])).toBe(config); //fluent API check
    expect(config.getDependencies()[1]).toBe('def');

    config = new ValidationConfig();
    expect(config.useLocale('nl-BE')).toBe(config); //fluent API check
    expect(config.getValue('locale')).toBe('nl-BE');

    config = new ValidationConfig();
    expect(config.treatAllPropertiesAsMandatory()).toBe(config); // fluent API check
    expect(config.getValue('allPropertiesAreMandatory')).toBe(true);

    config = new ValidationConfig();
    expect(config.treatAllPropertiesAsOptional()).toBe(config);// fluent API check
    expect(config.getValue('allPropertiesAreMandatory')).toBe(false);
  });

  it('should never change the defaults', () => {
    var config1 = new ValidationConfig();
    var config2 = new ValidationConfig();

    expect(config2.getDebounceTimeout()).toBe(0);
    config1.useDebounceTimeout(50);
    expect(config2.getDebounceTimeout()).toBe(0);
  });

  it('should allow you to set values', () => {
    var config = new ValidationConfig();
    config.setValue('test', 'a');
    expect(config.getValue('test')).toBe('a');
  });

  it('should get values set on the parent when it does not have a value itself ', () => {
    var parentConfig = new ValidationConfig();
    parentConfig.setValue('test', 'a');
    var config = new ValidationConfig(parentConfig);
    expect(config.getValue('test')).toBe('a');
  });

  it('should get not copy the values but instead delegate to the parent', () => {
    var parentConfig = new ValidationConfig();
    parentConfig.setValue('test', 'a');
    var config = new ValidationConfig(parentConfig);
    expect(config.getValue('test')).toBe('a');

    parentConfig.setValue('test', 'b');
    expect(config.getValue('test')).toBe('b');
  });

  it('should allow to override parents with own values', () => {
    let parentConfig;
    let config;
    parentConfig = new ValidationConfig();
    parentConfig.setValue('test', 'a');
    config = new ValidationConfig(parentConfig);
    expect(config.getValue('test')).toBe('a');
    config.setValue('test', 'c');
    parentConfig.setValue('test', 'b');
    expect(config.getValue('test')).toBe('c');
  });

  describe('error rendering', () => {
    let validationSummary;
    let container;
    let validationConfig;

    beforeEach(() => {
      container = new Container();
      validationConfig = container.get(ValidationConfig);
      validationSummary = container.get(ValidationSummary);
    });

    it('defaults to isRenderingErrors is false', () => {
      expect(validationConfig.getValue('isRenderingErrors')).toBe(false);
    });

    describe('.setValidationSummary', () => {
      it('turns on isRenderingErrors to true', () => {
        validationConfig.setValidationSummary(validationSummary);
        expect(validationConfig.getValue('isRenderingErrors')).toBe(true);
      });

      it('sets the validationSummary to an instance of validationSummary', () => {
        validationConfig.setValidationSummary(validationSummary);
        expect(validationConfig.getValue('validationSummary')).toBe(validationSummary);
      });
    });

    it('does not call validationSummarys showErrors method', () => {
      expect(validationConfig.isRenderingErrors).toBe(undefined);
    });
  });
});
