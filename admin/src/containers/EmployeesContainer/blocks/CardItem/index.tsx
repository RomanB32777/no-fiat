import { Col, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";
import ConfirmPopup from "../../../../components/ConfirmPopup";
import { PencilIcon, TrashBinIcon } from "../../../../icons/icons";
import { useAppSelector } from "../../../../store/hooks";
import "./styles.sass";

const CardItem = ({
  data,
  getCardName,
  deleteItem,
  openEditModal,
}: {
  data: any; // string
  getCardName?: (address: string) => Promise<string>;
  deleteItem: (data: string) => Promise<any>;
  openEditModal?: (data: any) => any // Promise<any>; // T
}) => {
  const { organization } = useAppSelector((state) => state);
  const [cardName, setCardName] = useState<string>("");
  const [cardLoading, setCardLoading] = useState<boolean>(false);

  const editItem = (event?: React.MouseEvent<HTMLDivElement>) => {
    event && event.stopPropagation();
    openEditModal && openEditModal(data);
  };

  const deleteCard = async () => await deleteItem(data);

  useEffect(() => {
    const getCardInfo = async () => {
      if (getCardName) {
        setCardLoading(true);
        const itemName = await getCardName(data);
        setCardName(itemName);
        setCardLoading(false);
      }
    };

    getCardInfo();
  }, [data, organization]);

  return (
    <div className="employees-item">
      {cardLoading ? (
        <Skeleton active paragraph={{ rows: 0 }} />
      ) : (
        <Row justify="space-between" align="middle">
          <Col>
            <div className="title">{cardName}</div>
          </Col>
          <Col>
            <div className="btns">
              <div
                className="item icon"
                onClick={editItem}
                style={{ marginRight: 10 }}
              >
                <PencilIcon />
              </div>
              <div
                className="item icon"
                onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                  e.stopPropagation()
                }
              >
                <ConfirmPopup confirm={deleteCard}>
                  <div className="icon">
                    <TrashBinIcon />
                  </div>
                </ConfirmPopup>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default CardItem;
