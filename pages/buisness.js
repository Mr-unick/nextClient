
import HomeLayout from "../app/components/layouts/homeLayouyt";
import DataTable from "../app/components/tables/dataTable";


export default function buisness (){

    return <HomeLayout>
        <DataTable url = {'getBuisnessProps'} />
    </HomeLayout>
};
