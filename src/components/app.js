import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchProfile } from '../actions/githubActions';
import Spinner from './common/Spinner';
import Filter from './filter'

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      search: '',
      per_page: 5,
      errors: {}
    };
    this.perPage = this.perPage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.users){
        this.setState({ loading: true });
        this.setState({users: nextProps.users});
      }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  perPage(e){
    this.props.searchProfile(this.state.search, this.state.per_page);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.searchProfile(this.state.search);
  }

  render() {
    // const education = this.props.users.map(user => (
      {/*<div>user</div>*/}
    // ));
    let dashboardContent;
    const { users, loading } = this.props;
    if (loading) {
      dashboardContent = <Spinner />;
    } else {

      if (this.props.users) {
        const usersTable = this.props.users.map((user, key) => (
            <tr key={key}>
              <th scope="row">{user.id}</th>
              <td>{user.login}</td>
              <td>{user.type}</td>
              <td>{user.url}</td>
            </tr>
        ));
        dashboardContent = (
            <div>
              <table className="table">
                <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Url</th>
                </tr>
                </thead>
                <tbody>
                {usersTable}
                </tbody>
              </table>
            </div>
        );
      } else {
        dashboardContent = (
            <div>Search For Users</div>
        );
      }
    }
    return (
        <div className="container">
          <br/>
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 row">
              <Filter users={this.props.users} onChange={this.onChange.bind(this)} />
              <div className="sort-box col-lg-6">
                <div className="title"><p>Sort</p></div>
                <ul className="list-group list-group-horizontal">
                  <li className="list-group-item">
                    <input name="per_page"
                           onChange={this.onChange.bind(this)}
                           onBlur={this.perPage}
                           placeholder="5"/>
                  </li>
                </ul>
              </div>
              <form className="card card-sm col-lg-12" onSubmit={this.onSubmit}>
                <div className="card-body row no-gutters align-items-center">
                  <div className="col-auto">
                    <i className="fas fa-search h4 text-body"></i>
                  </div>
                  <div className="col">
                    <input className="form-control form-control-lg form-control-borderless"
                           name="search"
                           type="search"
                           onChange={this.onChange.bind(this)}
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
  users: state.gitHub.users,
  loading: state.gitHub.loading,
  errors: state.errors
});

export default connect(mapStateToProps, { searchProfile })(App);
