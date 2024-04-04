import { Button, Result, Spin } from "antd"
import { useResultPaymentQuery } from "../api/site/Payment";
import { useLocation, useNavigate } from "react-router-dom";

const BookingResults = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(location.search);

    const vnp_Amount = searchParams.get('vnp_Amount');
    const vnp_BankCode = searchParams.get('vnp_BankCode');
    const vnp_BankTranNo = searchParams.get('vnp_BankTranNo');
    const vnp_CardType = searchParams.get('vnp_CardType');
    const vnp_OrderInfo = searchParams.get('vnp_OrderInfo');
    const vnp_PayDate = searchParams.get('vnp_PayDate');
    const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
    const vnp_TmnCode = searchParams.get('vnp_TmnCode');
    const vnp_TransactionNo = searchParams.get('vnp_TransactionNo');
    const vnp_TransactionStatus = searchParams.get('vnp_TransactionStatus');
    const vnp_TxnRef = searchParams.get('vnp_TxnRef');
    const vnp_SecureHash = searchParams.get('vnp_SecureHash');

    const { data, isLoading, isError } = useResultPaymentQuery({
        vnp_Amount,
        vnp_BankCode,
        vnp_BankTranNo,
        vnp_CardType,
        vnp_OrderInfo,
        vnp_PayDate,
        vnp_ResponseCode,
        vnp_TmnCode,
        vnp_TransactionNo,
        vnp_TransactionStatus,
        vnp_TxnRef,
        vnp_SecureHash
    });
    console.log(isError)



    return (
        <Spin spinning={isLoading}>
            {isError ? (
                <Result
                    status="error"
                    title={data?.message}
                    subTitle="Đặt lịch khám không thành công!!"
                    extra={[
                        <Button type="default" key="console" onClick={() => navigate(-3)}>
                            Đặt lại lịch
                        </Button>,
                    ]}
                />
            ) : (
                <Result
                    status="success"
                    title={data?.message}
                    subTitle="Đặt lịch khám thành công!!"
                    extra={[
                        <Button type="primary" key="console" className="bg-blue-500" href="/lich-hen">
                            Xem lịch đã đặt
                        </Button>,
                    ]}
                />
            )}
        </Spin>
    )
}

export default BookingResults