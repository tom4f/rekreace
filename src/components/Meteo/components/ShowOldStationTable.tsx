import {useState, useEffect, useContext, useRef} from 'react';
import { DateContext } from './DateContext';
import { apiPath } from '../api/apiPath'
import TableStyle from './../css/Table.module.scss'
import { oldPocasiType, rgbCssType } from './TypeDefinition';

export const ShowOldStationTable = () => {

    const { reduceDate } = useContext(DateContext);

    const [ orderBy, setOrderBy ] = useState (
        {
            value : 'date',
            order : 'DESC'
        }
    );

    // which lines requested from mySQL
    const [ start, setStart ] = useState(0);
    const [ davis, setDavis ] = useState<oldPocasiType[]>();

    const loadDavis = (start: number, orderBy: { value: string; order: string }) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `${apiPath}/pdo_read_old_station.php`, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const pdoResp = JSON.parse(xhr.responseText);
                setDavis(pdoResp);
                const [ year, month, day ] = pdoResp[0].date.split('-');
                const clickedDate = new Date( year, month - 1, day );
                reduceDate('daily', clickedDate );
            }
        }
        xhr.onerror = () => console.log("** An error occurred during the transaction");
        xhr.send(JSON.stringify(
            { 
                'start' : start,
                'limit' : 30,
                'orderBy' : orderBy.value,
                'sort' : orderBy.order
            }
        ));
    }

    const loadDavisRef = useRef( loadDavis )

    useEffect( () => loadDavisRef.current(start, orderBy), [ start, orderBy ] );

    const rgbCss: rgbCssType = (r, g, b, value) => { return { background: `rgba(${r}, ${g}, ${b}, ${value})` } };  
    const rgbCssT = (value: number) => { 
        return value > 0
            ? { background: `rgba(255, 0, 0, ${ value/35})` }
            : { background: `rgba(0, 0, 255, ${-value/25})` }
    };

    const printDavis = () => {
        const output: JSX.Element[] = [];
        davis?.forEach( (one, index) => {
            output.push( 
                <tr key={index}>
                     <td className={ TableStyle.link }>{one.date}</td> 
                    {/*<td className="link" >{one.date}</td>*/}
        
                    <td style={ rgbCss(0, 255, 0, one.wind3                 /1285 ) }>{one.wind3}</td>
                    <td style={ rgbCss(0, 255, 0, one.wind6                 /500  ) }>{one.wind6}</td>
                    <td style={ rgbCss(0, 255, 0, one.wind9                 /100  ) }>{one.wind9}</td>
                    <td style={ rgbCss(0, 255, 0, one.wind12                /100  ) }>{one.wind12}</td>
                    <td style={ rgbCss(0, 255, 0, one.windmax               /30   ) }>{one.windmax}</td>
                    <td>{one.direct}</td>

                    <td style={ rgbCssT(one.tempmin) } >{one.tempmin}</td>
                    <td style={ rgbCssT(one.tempavg) }>{one.tempavg}</td>
                    <td style={ rgbCssT(one.tempmax) }>{one.tempmax}</td>

                    <td style={ rgbCss(255, 0, 255, one.rain                /30  ) }>{one.rain}</td>
                </tr>
            )
        });
        return output;
    }
    const sort = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const clickedName = (e.target as HTMLButtonElement).name;
        console.log(clickedName);
        setOrderBy({
            value : clickedName,
            order : orderBy.order === 'DESC' ? 'ASC' : 'DESC'
        })
    }

    return (
        <>  
            <header className="header" >
                Historie : &nbsp;
                <button onClick={ () => setStart( start <= 4045 - 365 ? start + 365 : start ) } > &nbsp; {'<<'} &nbsp; </button>
                <button onClick={ () => setStart( start <= 4045 - 30 ? start + 30 : start ) } > &nbsp; {'<'} &nbsp; </button>
                &nbsp; {start} &nbsp;
                <button onClick={ () => setStart( start >= 30 ? start - 30 : start ) } > &nbsp; {'>'} &nbsp; </button>
                <button onClick={ () => setStart( start >= 365 ? start - 365 : start ) } > &nbsp; {'>>'} &nbsp; </button>
                &nbsp; dní
            </header>
                <section className={ TableStyle.davisTable }>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th colSpan={6}>vítr</th>
                                <th colSpan={3}>teplota vzduchu</th>
                                <th colSpan={1}>srážky</th>
                            </tr>
                            <tr>
                                <th><button id="date" onClick={ (e) => sort(e) } >datum</button></th>
                                <th><button id="wind3" onClick={ (e) => sort(e) } >&gt;3<sub id="wind3">m/s</sub></button></th>
                                <th><button id="wind6" onClick={ (e) => sort(e) } >&gt;6<sub id="wind6">m/s</sub></button></th>
                                <th><button id="wind9" onClick={ (e) => sort(e) } >&gt;9<sub id="wind9">m/s</sub></button></th>
                                <th><button id="wind12" onClick={ (e) => sort(e) } >&gt;12<sub id="wind12">m/s</sub></button></th>
                                <th><button id="windmax" onClick={ (e) => sort(e) } >max</button></th>
                                <th><button id="direct" onClick={ (e) => sort(e) } >směr</button></th>
      
                                <th><button id="tempmin" onClick={ (e) => sort(e) } >min</button></th>
                                <th><button id="tempavg" onClick={ (e) => sort(e) } >prů</button></th>
                                <th><button id="tempmax" onClick={ (e) => sort(e) } >max</button></th>
                                
                                <th><button id="rain" onClick={ (e) => sort(e) } >celk</button></th>
      
                            </tr>
                            <tr>
                                <th>graf</th>
                                <th>min</th>
                                <th>min</th>
                                <th>min</th>
                                <th>min</th>
                                <th>m/s</th>
                                <th>-</th>

                                <th>&deg;C</th>
                                <th>&deg;C</th>
                                <th>&deg;C</th>
                                
                                <th>mm</th>

                            </tr>
                        </thead>
                        <tbody>
                            {printDavis()}
                        </tbody>
                    </table>
                </section>
        </>
    )
}