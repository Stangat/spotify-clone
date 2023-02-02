import style from './less.module.less';
import { Routes, Route, Link } from 'react-router-dom';
import 'antd/dist/antd';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';

export default function App() {
  return (
    <div className={style.app}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<SearchPage />} />
      </Routes>
    </div>
  );
}
