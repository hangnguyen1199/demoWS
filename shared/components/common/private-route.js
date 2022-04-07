

import React, { Component } from "react";
import SpoManagementLayout from './../../containers/layout/spo-management-layout';

export function privateRoute (WrappedComponent) {
    
    return class extends Component {
        static async getInitialProps (ctx) {
            if (false) {
                ctx.res.writeHead(302, {
                    Location: "/login?redirected=true",
                });
                ctx.res.end();
            }
            if (WrappedComponent.getInitialProps) {return WrappedComponent.getInitialProps(initialProps);}
            WrappedComponent.Layout = SpoManagementLayout
            return {};
        }

        

        render () {
            return <WrappedComponent {...this.props} Layout = {SpoManagementLayout} />;
        }
    };
}