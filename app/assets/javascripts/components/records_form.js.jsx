Formsy.addValidationRule('isDate', function(values, value){
  return !isNaN(Date.parse(value));
});

Formsy.addValidationRule('isExisty', function(values, value){
  return value !== null && value !== undefined;
});

Formsy.addValidationRule('isCurrency', function(values, value){
  var default_currency_options = {
    symbol: '$'
  , require_symbol: false
  , allow_space_after_symbol: false
  , symbol_after_digits: false
  , allow_negatives: true
  , parens_for_negatives: false
  , negative_sign_before_digits: false
  , negative_sign_after_digits: false
  , allow_negative_sign_placeholder: false
  , thousands_separator: ','
  , decimal_separator: '.'
  , allow_space_after_digits: false
};

  return currencyRegex(default_currency_options).test(value);
});


var MyOwnInput = React.createClass({
  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  render: function () {

    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    var className = this.props.className + ' ' + (this.showRequired() ? 'required' : this.showError() ? 'error' : null);

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    var errorMessage = this.getErrorMessage();

    return (
      <div className='form-group'>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <input className="form-control" type={this.props.type || 'text'} name={this.props.name} onChange={this.changeValue} value={this.getValue()}/>
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }
});

var RecordForm = React.createClass({
  getInitialState: function() {
    return { canSubmit: false };
  },
  submit: function(data, reset, invalidate) {
    this.props.onRecordSubmit({record: data});
    this.setState(this.getInitialState());
    reset(); // clears form fields
  },
  enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },
  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },
  render: function () {
    return (
      <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="form-inline records-form">
        <MyOwnInput name="date" title="Date" validations="isExisty,isDate" validationError="This is not a valid date" ref="date" required />
        <MyOwnInput name="title" title="Title" ref="title" validations="isExisty" required />
        <MyOwnInput name="amount" title="Amount" ref="amount" validations="isExisty,isCurrency" validationError="This is not a valid currency" required />
        <button className="btn btn-primary" type="submit" disabled={!this.state.canSubmit}>Submit</button>
      </Formsy.Form>
    );
  }
});


// var RecordForm = React.createClass({
//   getInitialState: function(){
//     return {title: '', amount: '', date: ''}
//   },
//   handleChange: function(e){
//     var name = e.target.name;
//     var obj = {};
//     obj[name] = e.target.value;
//     this.setState(obj);
//   },
//   valid: function(){
//     return (this.state.title && this.state.amount && this.state.date);
//   },
//   handleSubmit: function(e){
//     e.preventDefault();
//     this.props.onRecordSubmit({record: this.state});
//     this.setState(this.getInitialState());
//   },
//   render: function(){
//     return(
//       <form className="form-inline records-form" role="form" onSubmit={this.handleSubmit}>
//         <div className="form-group" ref="dategroup">
//           <input className="form-control" id="date" type="text" placeholder="Date" name="date" ref="date" value={this.state.date} onChange={this.handleChange}/>
//         </div>
//         <div className="form-group">
//          <input className="form-control" type="text" placeholder="Title" name="title" ref="title" value={this.state.title} onChange={this.handleChange}/>
//         </div>
//         <div className="form-group">
//           <input className="form-control" type="text" placeholder="Amount" name="amount" ref="amount" value={this.state.amount} onChange={this.handleChange}/>
//         </div>
//         <input type="submit" className="btn btn-primary" value="Create Record" disabled={!this.valid()}/>
//       </form>
//     );
//   }
// });
