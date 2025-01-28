
import HomeLayout from "../app/components/layouts/homeLayouyt";
import DataTable from "../app/components/tables/dataTable";


export default function users (){

    return <HomeLayout>
        <DataTable url = {'getUserProps'} />
    </HomeLayout>
};
