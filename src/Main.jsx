import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import postApi from './postApi.js';
import geolocation from './geolocation';
import Overview from './Overview';
import Cityreport from './Cityreport';
import Personalreport from './Personalreport';

class Main extends Component{ 
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
    updateSize(){
        try{
          const parentDom = ReactDOM.findDOMNode(this).parentNode;
          let {width,height} = this.props;
          
          if(!width){
            width = parentDom.offsetWidth;
            
            if(width>600){
              width = width
              height = width*0.45
            }else{
              width = width
              height = width
            }
          }
          
          this.setState({width,height});
        }catch(ignore){}
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
                            overview:data.res.Overview,
                            cityreport:data.res.Cityreport,
                            personalreport:data.res.Personalreport,
                            isLoading : false
                        })
                 })
            })
        })
      }
    render(){
        const {overview,cityreport,personalreport,isLoading} = this.state;
        console.log(this.props)
        console.log(this.state)
        if(isLoading){
            return (
              <div className="loaddata">
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