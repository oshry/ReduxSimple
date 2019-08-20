import React, {Component} from 'react';
import {connect} from 'react-redux';
import { sortBy } from '../actions/githubActions';

class Filter extends Component {
    constructor() {
        super();
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
    componentWillReceiveProps(nextProps) {
        if(nextProps.users){
            this.setState({ loading: true });
            this.setState({users: nextProps.users});
        }
    }
    // onChange(e) {
    //     this.setState({ [e.target.name]: e.target.value });
    // }
    sortMe(e){
        e.preventDefault();
        let toSort = this.props.users;
        toSort.sort(this.compareValues(e.target.value, e.target.getAttribute("direction")))
        this.props.sortBy(toSort);
        this.props.onChange(e);
    }
    render() {
        return (
            <div className="sort-box col-lg-6">
                <div className="title"><p>Sort</p></div>
                <ul className="sort-group list-group-horizontal">
                    <li className="list-group-item">
                        {/*<button onClick={this.sortMe.bind(this)} onChange={this.props.onChange.bind(this)} value="id" direction="asc" >ID asc</button>*/}
                        {/*<button onClick={this.sortMe.bind(this)} onChange={this.props.onChange.bind(this)} value="id" direction="desc" >ID desc</button>*/}
                    </li>
                    <li className="list-group-item">
                        <button onClick={this.sortMe.bind(this)} value="login" direction="asc" >Name asc</button>
                        <button onClick={this.sortMe.bind(this)} value="login" direction="desc" >Name desc</button>
                    </li>
                    <li className="list-group-item">
                        {/*<button onClick={this.sortMe.bind(this)} onChange={this.props.onChange.bind(this)} value="url" direction="asc" >github url asc</button>*/}
                        {/*<button onClick={this.sortMe.bind(this)} onChange={this.props.onChange.bind(this)} value="url" direction="desc" >github url desc</button>*/}
                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.gitHub.users,
});
export default connect(mapStateToProps, { sortBy })(Filter);
