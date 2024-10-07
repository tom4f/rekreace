import { useState, useEffect, useContext, useRef } from 'react';
import { DateContext } from './DateContext';
import { apiPath } from '../api/apiPath'
import TableStyle from './../css/Table.module.scss'
import { showYearTableType, rgbCssType } from './TypeDefinition';

export const ShowYearTable = ({
    pocasi, setPocasi,
    editMeteo,
    user = 'no-user',
    webToken = 'error' }: showYearTableType) => {

    const refresh = editMeteo?.refresh ?? 0
    const { reduceDate } = useContext(DateContext);

    const [ orderBy, setOrderBy ] = useState (
        {
            value : 'datum',
            order : 'DESC'
        }
    );
    
    const limit = 30;
    
    const [ start,  setStart ]  = useState(0);


    const loadPocasi = (start: number, orderBy: { value: string; order: string }) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${apiPath}/pdo_read_pocasi.php`, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const pdoResp = JSON.parse(xhr.responseText);
                if ( pdoResp.length ) {
                    setPocasi(pdoResp);
                    const [ year, month, day ] = pdoResp[0].datum.split('-');
                    const clickedDate = new Date( year, month - 1, day );
                    reduceDate('yearSum', clickedDate );
                }
            } 
        }
        xhr.onerror = () => console.log("** An error occurred during the transaction");
        //xhr.send();
        xhr.send(JSON.stringify(
            { 
                'start' : start,
                'limit' : limit,
                'orderBy' : orderBy.value,
                'sort' : orderBy.order
            }
        ));
    }

    const loadPocasiRef = useRef( loadPocasi )

    useEffect( () => loadPocasiRef.current(start, orderBy), [ start, orderBy, refresh ]);

    const rgbCss: rgbCssType = (r, g, b, value) => { return { background: `rgba(${r}, ${g}, ${b}, ${value})` } };  
    const rgbCssT = (value: number) => { 
        return value > 0
            ? { background: `rgba(255, 0, 0, ${ value/35})` }
            : { background: `rgba(0, 0, 255, ${-value/25})` }
    };

    const printPocasi = () => {
        const output: JSX.Element[] = [];
        pocasi?.forEach( (one, index)  => output.push( 
            <tr key={index}>
                <td className={ webToken !== 'error' ? TableStyle.datum : '' }>{one.datum}</td>
                <td style={ rgbCss(255, 0, 0, 1 - (725 - one.hladina)       /2 ) }>{one.hladina}</td>
                <td style={ rgbCss(0, 255, 0, one.pritok                    /100 ) }>{one.pritok}</td>
                <td style={ rgbCss(0, 255, 0, one.odtok                     /100 ) }>{one.odtok}</td>
                <td style={ rgbCss(255, 0, 0, one.voda                      /25 ) }>{one.voda}</td>
                <td style={ rgbCssT(one.vzduch) }>{one.vzduch}</td>
                <td>{one.pocasi}</td>
            </tr>
            ) );
        return output;
    }

    const sort = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const clickedName = (e.target as HTMLButtonElement).name;
        setOrderBy({
            value : clickedName,
            order : orderBy.order === 'DESC' ? 'ASC' : 'DESC'
        })
    }

    return (
        <>
            { webToken !== 'error' ? <header className="header">Přihlášený uživatel: {user}</header> : null }
            <header className="header" >
                Historie : &nbsp; 
                <button onClick={ () => pocasi?.length === limit ? setStart( start + limit ) : null  } > &nbsp; {'<'} &nbsp; </button>
                &nbsp; {start} &nbsp;
                <button onClick={ () => start - limit >= 0 ? setStart( start - limit ) : null  } > &nbsp; {'>'} &nbsp; </button>
                &nbsp; dní
            </header>
            <section className={ TableStyle.davisTable }>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th colSpan={3}>vodní nádrž Lipno [00:00 hod]</th>
                            <th colSpan={3}>[7:00 hod]</th>
                        </tr>
                        <tr>
                            <th><button name="datum" onClick={ (e) => sort(e) } >datum</button></th>
                            <th><button name="hladina" onClick={ (e) => sort(e) } >hladina</button></th>
                            <th><button name="pritok" onClick={ (e) => sort(e) } >přítok</button></th>
                            <th><button name="odtok" onClick={ (e) => sort(e) } >odtok</button></th>
                            <th><button name="voda" onClick={ (e) => sort(e) } >voda</button></th>
                            <th><button name="vzduch" onClick={ (e) => sort(e) } >vzduch</button></th>
                            <th>komentář</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>m n.m.</th>
                            <th>m<sup>3</sup>/s</th>
                            <th>m<sup>3</sup>/s</th>
                            <th>&deg;C</th>
                            <th>&deg;C</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {printPocasi()}
                    </tbody>
                </table>
            </section>
        </>
    )
}