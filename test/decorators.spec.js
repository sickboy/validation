import {Validation} from '../src/validation';
import {ObserverLocator} from 'aurelia-binding';
import {Expectations} from './expectations';
import {ValidationConfig} from '../src/validation-config';
import {ensure} from '../src/decorators';
import {Container} from 'aurelia-dependency-injection';

class TestSubject {

  @ensure(function(it){it.isNotEmpty().hasLengthBetween(3,10)})
  firstName = '';

  constructor() {
    let container = new Container();
    this.validation = new Validation(container.get(ObserverLocator)).on(this);
  }
}


describe( 'Tests on using decorators to set up validation', () => {

  it('on a single property that is invalid', (done) => {
    var expectations = new Expectations(expect, done);
    let subject = new TestSubject();
    expectations.assert(subject.validation.validate(), false);
    expectations.validate();
  });

  it('on a single property that is valid', (done) => {
    var expectations = new Expectations(expect, done);
    let subject = new TestSubject();
    subject.firstName = "Bobette";
    expectations.assert(subject.validation.validate(), true);
    expectations.validate();
  });


});
