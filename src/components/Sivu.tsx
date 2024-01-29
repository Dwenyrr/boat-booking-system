import { CardMedia } from '@mui/material';
import aallot from '../img/aallot.png'

interface Props {
    children : React.ReactElement | React.ReactElement[] | string
}

const Sivu : React.FC<Props> = (props : Props) : React.ReactElement => {

    return (
        <div style={{width: '600px'}}>

        {props.children}

        <CardMedia component="img" src={aallot} sx={{width: '100%'}}/>
        
        </div>
    )
}

export default Sivu;