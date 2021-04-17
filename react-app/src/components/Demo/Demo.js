import JumbotronWrapper from '../JumbotronWrapper/JumbotronWrapper';
import Layout from '../Layout/Layout';


const Demo = (WrappedComponent) => {
    const Component = (props) => {
        return (
            <>
                <JumbotronWrapper />
                <Layout>
                    <WrappedComponent {...props} />
                </Layout>
            </>
        )
    }

    return Component;
}

export default Demo;