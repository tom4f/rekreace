import BottomStyle from './../css/Bottom.module.scss'

export const Bottom = () => {
    return ( 
        <div>
            <div className={ BottomStyle.bottom } >
                <a href="https://www.toplist.cz/stat/6477" target="_top">
                    <img src="https://toplist.cz/count.asp?id=6477&logo=bc" alt="TOPlist" width="88" height="120"/>
                </a>
            </div>
            <div className="header">
                (C)1998-2021
                <a href="mailto:ubytovani@lipnonet.cz"> ubytovani@lipnonet.cz</a>
                <br/>
                <a href="http://www.lipnonet.cz/">LIPNOnet.cz</a> | 
                <a href="http://www.lipno.net/"> LIPNO.net</a> | 
                <a href="http://www.frymburk.com/"> FRYMBURK.com</a> | 
                <a href="http://www.frymburk.eu/"> FRYMBURK.eu</a>
            </div>
        </div>
    );
}