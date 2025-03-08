import HealthcheckInfo from "@/components/ui/HealthcheckInfo";
import { useHealthcheck } from "@/usecases/useHealthcheck";

const HealthcheckPage = () => {
    const {
        data
    } = useHealthcheck();

    return (
        <HealthcheckInfo
            status={data?.status ?? "no info"}
            environment={data?.systemInfo.environment ?? "no info"}
            version={data?.systemInfo.version ?? "no info"} 
        />
    );
};

export default HealthcheckPage;