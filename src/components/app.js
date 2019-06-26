import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchProfile } from '../actions/githubActions';
import Spinner from './common/Spinner';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      search: '',
      errors: {}
    };
    this.sortBy = this.sortBy.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  compareValues(key, order='asc') {
    return function(a, b) {
      if(!a.hasOwnProperty(key) ||
          !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = (typeof a[key] === 'string') ?
          a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
          b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
          (order == 'desc') ?
              (comparison * -1) : comparison
      );
    };
  }
  sortBy(e){
    let toSort = this.state.users;
    toSort.sort(this.compareValues(e.target.value, e.target.getAttribute("direction")))
    console.log(toSort);
    this.setState({users: toSort});
  }

  // componentWillUpdate(nextProps, nextState){
  //   // input change
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   console.log('componentDidUpdate');
  // }
  // static getDerivedStateFromProps(nextProps, prevState){
  //   console.log('sdsdsdsdsds1111');
  //   if(nextProps.someValue!==prevState.someValue){
  //     return { someState: nextProps.someValue};
  //   }
  //   else return null;
  // }

  componentWillReceiveProps(nextProps) {
      if(nextProps.users){
        this.setState({ loading: true });
        this.setState({users: nextProps.users});
      }
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
    setTimeout(() => {
      this.setState({ loading: true });
    }, 3000);

    this.props.searchProfile(this.state.search);


    // this.forceUpdate();
    // this.setState({ [e.target.name]: e.target.value });
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
        // console.log(users);
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
            <div className="col-12 col-md-10 col-lg-8">
              <div className="sort-box">
                <ul className="list-group list-group-horizontal">
                  <li className="list-group-item">
                    <button onClick={this.sortBy} value="id" direction="asc" >ID asc</button>
                    <button onClick={this.sortBy} value="id" direction="desc" >ID desc</button>
                  </li>
                  <li className="list-group-item">
                    <button onClick={this.sortBy} value="login" direction="asc" >Name asc</button>
                    <button onClick={this.sortBy} value="login" direction="desc" >Name desc</button>
                  </li>
                  <li className="list-group-item">
                    <button onClick={this.sortBy} value="url" direction="asc" >github url asc</button>
                    <button onClick={this.sortBy} value="url" direction="desc" >github url desc</button>
                  </li>
                </ul>
              </div>
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
  users: state.gitHub.users,
  loading: state.gitHub.loading,
  errors: state.errors
});

export default connect(mapStateToProps, { searchProfile })(App);
