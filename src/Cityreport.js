import React, { Component } from "react";
import ReactDOM from 'react-dom';
import React_leaflet from './React_leaflet.js';

const testdata={
    'Thisweek':{
        'Hotzone':{
            "R01":10,
            'R02':10,
            'R03':10,
            'R04':10,
            'R05':10,
            'R06':10,
            'R07':10,
            'R08':10,
            'R09':10,
            'R10':10,
            'R11':10,
            'R12':10,
            'R17':10,
            'R13':10,
            'R18':10,
            'R19':10,
            'R20':10,
            'R21':10,
            'R22':10,
            'R23':10,
            'R24':10,
            'R25':10,
            'R26':10,
            'R27':10,
            'R28':10,
            'R29':10,
            'R30':10,
            'R31':10,
            'D04':10,
            'R14':10,
            'R15':10,
            'R16':10,
            'D06':10,
            'D02':10,
            'D01':10,
            'D07':10,
            'D08':10,
        },
        'Detail':{
        'All':{
            'Category':{
                "parking":40,
                "light":10,
                "noise":10,
                "aisle":10,
                "road":10,
                "traffic":1,
                "dirty":10,
                "pipe":5 ,
                "animal":10
            },
            'Time':{
                "parking":{
                    Seconds:25610,
                    Formates:'1:12:30'},
                "light":{
                    Seconds:25610,
                    Formates:'1:12:30'},
                "noise":{
                    Seconds:25610,
                    Formates:'1:12:30'},
                "aisle":{
                    Seconds:25610,
                    Formates:'1:12:30'},
                "road":{
                    Seconds:25610,
                    Formates:'1:12:30'},
                "traffic":{
                    Seconds:25610,
                    Formates:'1:12:30'},
                "dirty":{
                    Seconds:25610,
                    Formates:'1:12:30'},
                "pipe":{
                    Seconds:25610,
                    Formates:'1:12:30'},
                "animal":{
                    Seconds:25610,
                    Formates:'1:12:30'},
            },
            'DailyNum':{
                '2018-9-1':{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                '2018-9-2':{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                '2018-9-3':{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                '2018-9-4':{
                    "parking":3,
                    "light":10,
                    "noise":2,
                    "aisle":10,
                    "road":1,
                    "traffic":10,
                    "dirty":10,
                    "pipe":1 ,
                    "animal":10  
                },
                '2018-9-5':{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                '2018-9-6':{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                '2018-9-7':{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
            },
            'HourNum':{
                0:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                1:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                2:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                3:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                4:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                5:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                6:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
               
                7:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                8:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                9:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                10:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                11:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                12:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                13:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                14:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                15:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                16:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                17:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                18:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                19:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                20:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                21:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                22:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                23:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                }
            }
        }
    }},
    'Lastweek':{
        'Hotzone':{
            "R01":10,
            'R02':10,
            'R03':10,
            'R04':10,
            'R05':10,
            'R06':10,
            'R07':10,
            'R08':10,
            'R09':10,
            'R10':10,
            'R11':10,
            'R12':10,
            'R17':10,
            'R13':10,
            'R18':10,
            'R19':10,
            'R20':10,
            'R21':10,
            'R22':10,
            'R23':10,
            'R24':10,
            'R25':10,
            'R26':10,
            'R27':10,
            'R28':10,
            'R29':10,
            'R30':10,
            'R31':10,
            'D04':10,
            'R14':10,
            'R15':10,
            'R16':10,
            'D06':10,
            'D02':10,
            'D01':10,
            'D07':10,
            'D08':10,
        },
        'Detail':{
        'All':{
            'Category':{
                "parking":0,
                "light":0,
                "noise":0,
                "aisle":10,
                "road":10,
                "traffic":50,
                "dirty":10,
                "pipe":5 ,
                "animal":10
            },
            'Time':{
                "parking":{
                    Seconds:25610,
                    Formates:'1:12:30'},
                "light":{
                    Seconds:25610,
                    Formates:'1:12:30'},
                "noise":{
                    Seconds:25610,
                    Formates:'1:12:30'},
                "aisle":{
                    Seconds:25610,
                    Formates:'1:12:30'},
                "road":{
                    Seconds:25610,
                    Formates:'1:12:30'},
                "traffic":{
                    Seconds:25610,
                    Formates:'1:12:30'},
                "dirty":{
                    Seconds:25610,
                    Formates:'1:12:30'},
                "pipe":{
                    Seconds:25610,
                    Formates:'1:12:30'},
                "animal":{
                    Seconds:25610,
                    Formates:'1:12:30'},
            },
            'DailyNum':{
                '2018-10-1':{
                    "parking":0,
                    "light":0,
                    "noise":0,
                    "aisle":30,
                    "road":10,
                    "traffic":30,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":30  
                },
                '2018-10-2':{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":20,
                    "road":10,
                    "traffic":10,
                    "dirty":0,
                    "pipe":0 ,
                    "animal":10  
                },
                '2018-10-3':{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":0 ,
                    "animal":10  
                },
                '2018-10-4':{
                    "parking":3,
                    "light":0,
                    "noise":2,
                    "aisle":10,
                    "road":1,
                    "traffic":10,
                    "dirty":0,
                    "pipe":0 ,
                    "animal":0  
                },
                '2018-10-5':{
                    "parking":0,
                    "light":0,
                    "noise":0,
                    "aisle":10,
                    "road":0,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                '2018-10-6':{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                '2018-10-7':{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
            },
            'HourNum':{
                0:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                1:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                2:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                3:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                4:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                5:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                6:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
               
                7:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                8:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                9:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                10:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                11:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                12:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                13:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                14:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                15:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                16:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                17:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                18:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                19:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                20:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                21:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                22:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                },
                23:{
                    "parking":10,
                    "light":10,
                    "noise":10,
                    "aisle":10,
                    "road":10,
                    "traffic":10,
                    "dirty":10,
                    "pipe":10 ,
                    "animal":10  
                }
            }
        }
    }}
};
class Cityreport extends Component{
    constructor(props){
        super(props)
        this.state = {
            width:props.width||0,
            height:props.height||0,
            data:props.Thisweek,
            isLoading:false
        }
    }

    updateSize(){
        try{
          const parentDom = ReactDOM.findDOMNode(this).parentNode;
          let {width,height} = this.props;
          
          if(!width){
            width = parentDom.offsetWidth;
            
            
            width = width*0.35
            height = width*0.8
           
          }
          
          this.setState({width,height});
        }catch(ignore){}
    }
    thisweekdata(){
        this.setState({
            data:this.props.Thisweek,
        })
    }
    lastweekdata(){
        this.setState({
            data:this.props.Lastweek,
        })
    }
    componentDidMount(){
        this.updateSize();
        window.addEventListener('resize',this.updateSize.bind(this));
    }
    render(){
        return(
            <div className="Cityreport">
                <div className="btnbar">
                    <div className="ui buttons">
                        <button className="ui orange active button" onClick={this.thisweekdata.bind(this)}>本週</button>
                        <button className="ui orange active button" onClick={this.lastweekdata.bind(this)}>上週</button>
                    </div>
                </div>
                <div className="report">
                    <React_leaflet {...this.state.data}/>
                </div>
            </div>
        )
    }
}
export default Cityreport