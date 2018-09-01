import React, { Component } from 'react';
import postApi from './postApi.js';
import geolocation from './geolocation';
import Overview from './Overview';
import Cityreport from './Cityreport';
import Personalreport from './Personalreport';

class Main extends Component(){ 
    constructor(props){
        super(props);
        this.state={
            lat_lng:[],
            overview:null,
            cityreport:null,
            personalreport:null,
            isLoading : true,
        }
    }

    componentDidMount(){
        this.updateSize();
        window.addEventListener('resize',this.updateSize.bind(this));
        
        geolocation.getLocation().then(d=>{     
            this.setState({
                lat_lng:[d.coords.latitude,d.coords.longitude],
            },()=>{
                postApi.requertPost('./Nobug',{
                    params:{
                      lat:d.coords.latitude,
                      lon:d.coords.longitude,
                    }
                  }).then(data => {
                        this.setState({
                            overview:data.res.Response.Overview,
                            cityreport:data.res.Response.Cityreport,
                            personalreport:data.res.Response.Personalreport,
                            isLoading : false
                        })
                 })
            })
        })
      }
    render(){
        const {overview,cityreport,personalreport,isLoading} = this.state;
        console.log(this.props)
        if(isLoading){
            return (
              <div class="loaddata">
                <h3 id="load_text">正在接通1999 ......</h3>
              </div>
            )
          }
        return(
            <main>
                <Overview {...overview}/> 
                <Cityreport towngeo={this.props.towngeo} {...cityreport}/>
                <Personalreport datapath={this.props.towngeo} position={this.state.lat_lng} {...personalreport}/>
            </main>
        )
    }
}

   
export default Main