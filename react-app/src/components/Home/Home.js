import { Component } from 'react';



class Home extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.props.handleScroll);
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.props.handleScroll)
    }

    render() {
        return (
            <div style={{ height: "200vh" }}>
                <h1 >Some text 1</h1>
                <h1 >Some text 2</h1>
                <h1 >Some text 3</h1>
                <h1 >Some text 4</h1>
                <h1 >Some text 5</h1>
            </div >
        )
    }
}

export default Home;