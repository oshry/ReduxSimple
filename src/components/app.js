import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchProfile } from '../actions/githubActions';
import Spinner from './common/Spinner';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    // const searchData = {
    //     search: this.state.search
    // };
    // console.log('yesssss');
    this.props.searchProfile(this.state.search);

  }
  componentWillUpdate(nextProps, nextState){
    // input change
    console.log(nextState);
}
  componentWillReceiveProps(nextProps) {
    console.log('nextProps2222');
    console.log(nextProps);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { users } = this.props.users;
    // const education = this.props.users.map(user => (
      {/*<div>user</div>*/}
    // ));
    let dashboardContent;

    // if (users === null || loading) {
    //   dashboardContent = <Spinner />;
    // } else {
      // if (Object.keys(users).length > 0) {
      //   dashboardContent = (
      //       <div>
      //          users
      //       </div>
      //   );
      // } else {
        dashboardContent = (
            <div>
              no users
             </div>
        );
      // }
    // }
    return (
        <div className="container">
          <br/>
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <form className="card card-sm" onSubmit={this.onSubmit}>
                <div className="card-body row no-gutters align-items-center">
                  <div className="col-auto">
                    <i className="fas fa-search h4 text-body"></i>
                  </div>
                  <div className="col">
                    <input className="form-control form-control-lg form-control-borderless"
                           name="search"
                           type="search"
                           onChange={this.onChange}
                           placeholder="Search topics or keywords" />
                  </div>
                  <div className="col-auto">
                    <button className="btn btn-lg btn-success" type="submit">Search</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="dashboard">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="display-4">Dashboard</h1>
                  {dashboardContent}
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  errors: state.errors
});

export default connect(mapStateToProps, { searchProfile })(App);
