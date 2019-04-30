import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @author [Mauricio J Mondragon R]
 */
class CollapseOption extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        const step = this.props.step;
        const isActive = this.props.isActive;
        this.props.onToggleCollapse(step,isActive)
    }
    render(){
        const isActive = this.props.isActive;
        const step = this.props.step;
        const title =  'Step ' + step + '. ' + this.props.title;
        return (
            <div className={`rounded bg-gray ${this.props.className}`}>
                <button className="btn btn-block btn-primary text-left" onClick={this.handleClick}>
                   {title}
                </button>
                <div className={`pl-3 pr-3 py-2 pb-2 collapse ${isActive? 'show': ''}`}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
CollapseOption.propTypes = {
    title: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
    onToggleCollapse: PropTypes.func.isRequired
}
export default CollapseOption;