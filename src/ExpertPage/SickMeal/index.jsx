import SidebarExpert from '../../Component/SidebarExpert/SidebarExpert';
import TableHeathLog from '../MainPage/TableHeathLog';
import TableCreateMeal from '../components/TableCreateMeal/TableCreateMeal';

const SickMealExpert = () => {
  return (
    <div className="wrapper" style={{ height: '100vh' }}>
      <div className="row" style={{ height: '100vh' }}>
        <div className="col-2">
          <SidebarExpert current={'Sick'} />
        </div>
        <div className=" col-10 d-flex justify-content-center" style={{ padding: '0 32px' }}>
          <div className="col-8">
          <TableCreateMeal /></div>
        </div>
      </div>
    </div>
  );
};
export default SickMealExpert;
