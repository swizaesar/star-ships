import { Component } from "react";
import PropTypes from "prop-types";

class CodeSplit extends Component {
    state = {
        component: null,
    };

    componentDidMount() {
        const { load } = this.props;
        load().then((component) => {
            this.setState(() => ({
                component: component.default ? component.default : component,
            }));
        });
    }

    render() {
        const { children } = this.props;
        const { component } = this.state;
        return children(component);
    }
}

CodeSplit.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType])
        .isRequired,
    load: PropTypes.func.isRequired,
};

export default CodeSplit;
