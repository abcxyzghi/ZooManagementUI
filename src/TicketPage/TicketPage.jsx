import SidebarExpert from '../Component/SidebarExpert/SidebarExpert';
import TableCreateMeal from '../ExpertPage/components/TableCreateMeal/TableCreateMeal';

const TicketPage = () => {
  return (
    <div className="wrapper" style={{ height: '100vh' }}>
      <div className="row" style={{ height: '100vh' }}>
        <div className="col-2">
          <SidebarExpert current={'Daily'} />
        </div>

        <div className=" col-10 h-100" style={{ padding: '0 32px' }}>
          <div className="row h-100">
            <div className="col-2">as</div>
            <div className="col-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TicketPage;
