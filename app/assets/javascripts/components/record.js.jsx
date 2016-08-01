var Record = React.createClass({
  getInitialState: function(){
    return {edit: false}
  },
  handleToggle: function(e){
    e.preventDefault();
    this.setState({edit: !this.state.edit});
  },
  handleDelete: function(e){
    e.preventDefault();
    console.log(this.props.record.id)
    $.ajax({
      url: "/records/" + this.props.record.id,
      dataType: 'JSON',
      type: 'DELETE',
      success: function(){
        this.props.handleDeleteRecord(this.props.record);
      }.bind(this)
    });
  },
  handleEdit: function(e){
    e.preventDefault();
    var data = {date: React.findDOMNode(this.refs.date).value.trim(),
                title: React.findDOMNode(this.refs.title).value.trim(),
                amount: React.findDOMNode(this.refs.amount).value.trim()
              };

    $.ajax({
      method: 'PATCH',
      url: '/records/' + this.props.record.id,
      dataType: 'JSON',
      data: { record: data },
      success: function(data) {
        this.setState({ edit: false });
        this.props.handleEditRecord(this.props.record, data);
      }.bind(this)
    });
  },
  recordRow: function(){
    return(
      <tr>
        <td>{this.props.record.date}</td>
        <td>{this.props.record.title}</td>
        <td>{amountFormat(this.props.record.amount)}</td>
        <td>
          <a className='btn btn-default' onClick={this.handleToggle}>
            Edit
          </a>
          <a className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
        </td>
      </tr>
    );
  },
  recordForm: function(){
    return(
      <tr>
        <td>
          <input className='form-control' type='text'
                 defaultValue={this.props.record.date} ref='date'>
          </input>
        </td>
        <td>
          <input className='form-control' type='text'
                 defaultValue={this.props.record.title} ref='title'>
          </input>
        </td>
        <td>
          <input className='form-control' type='number'
                 defaultValue={this.props.record.amount} ref='amount'>
          </input>
        </td>
        <td>
          <a className='btn btn-default' onClick={this.handleEdit}>
            Update
          </a>
          <a className='btn btn-danger' onClick={this.handleToggle}>
            Cancel
          </a>
        </td>
      </tr>
    );
  },
  render: function(){
    if(this.state.edit){
      return this.recordForm();
    }else{
      return this.recordRow();
    }
  }
});
