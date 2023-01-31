import style from './less.module.less';
import { Routes, Route, Link} from 'react-router-dom';
import { Test } from './testPage';
import 'antd/dist/antd';
import { Button } from 'antd';

export default function App() {
  return (
    <div>
    <Routes>
      <Route path="/" />
      <Route path="*" element={<Test />}/>
    </Routes>
    <Link to="/qweqweasd">into nothingness</Link>
    <div className={style.className} >
      <button onClick={() => console.log(style.className)} className="test">test</button>
      <Button>ANTDtest</Button>
    </div>
  </div>
  )
}
