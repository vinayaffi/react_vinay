var Records = React.createClass({
  getInitialState: function() {
    return {data: this.props.data};
  },
  getDefaultProps: function() {
    return {data: []};
  },
  handleRecordSubmit: function(record){
    $.ajax({
      url: "records",
      dataType: 'JSON',
      type: 'POST',
      data: record,
      success: function(data){
        var records = React.addons.update(this.state.data, {$unshift: [data]});
        this.setState({data: records});
      }.bind(this),
      error: function(xhr, status, err) {
        //console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  deleteRecord: function(record){
    var index = this.state.data.indexOf(record);
    var records = React.addons.update(this.state.data,
      { $splice: [[index, 1]] });

    console.log(records);
    this.replaceState({data: records});
  },
  updateRecord: function(record, data){
    var index = this.state.data.indexOf(record);
    var records = React.addons.update(this.state.data,
                                      { $splice: [[index, 1, data]] });
    this.replaceState({ data: records });
  },
  credits: function() {
    var credits = this.state.data.filter(function(val) {
      return val.amount >= 0
    });
    return credits.reduce(function(prev, curr) {
      return prev + parseFloat(curr.amount);
    }, 0);
  },
  debits: function(){
    var debits = this.state.data.filter(function(val) {
      return val.amount < 0
    });
    return debits.reduce(function(prev, curr) {
      return prev + parseFloat(curr.amount)
    }, 0);
  },
  balance: function(){
    return this.credits() + this.debits();
  },
  render: function(){
    return(
      <div className="records">
        <h2 className="title">Records</h2>
        <div className="row">
          <AmountBox type='success' amount={this.credits()} text='Credit' />
          <AmountBox type='danger' amount={this.debits()} text='Debit' />
          <AmountBox type='info' amount={this.balance()} text='Balance' />
        </div>
        <RecordForm onRecordSubmit={this.handleRecordSubmit}/>
        <table className="table table-bordered table-responsive">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(function(record) {
              return <Record key={record.id} record={record}
                             handleDeleteRecord={this.deleteRecord} handleEditRecord={this.updateRecord} />
             }.bind(this))}
          </tbody>
        </table>
      </div>
    );
  }
});
