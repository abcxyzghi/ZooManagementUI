import SidebarExpert from '../../Component/SidebarExpert/SidebarExpert';
import TableHeathLog from './TableHeathLog';

const MainPageExpert = () => {
  return (
    <div className="wrapper" style={{ height: '100vh' }}>
      <div className="row" style={{ height: '100vh' }}>
        <div className="col-2">
          <SidebarExpert current={'Dashboard'} />
        </div>
        <div className=" col-10" style={{ padding: '0 32px' }}>
          <TableHeathLog />
        </div>
      </div>
    </div>
  );
};
export default MainPageExpert;
