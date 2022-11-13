import { Col, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";
import ConfirmPopup from "../../../../components/ConfirmPopup";
import { PencilIcon, TrashBinIcon } from "../../../../icons/icons";
import { cardObjType } from "../../utils";
import "./styles.sass";

interface ICardItem<T> {
  data: T; // string
  disabledDelete?: boolean;
  deleteItem: (data: T) => Promise<any>;
  getCardName?: (data: T) => Promise<string>;
  openEditModal?: (data: T) => any; // Promise<any>; // T
}

const CardItem = <T extends cardObjType>({
  data,
  disabledDelete = false,
  getCardName,
  deleteItem,
  openEditModal,
}: React.PropsWithChildren<ICardItem<T>>) => {
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
  }, [data]);

  return (
    <div className="employees-item">
      {cardLoading && !cardName ? (
        <Skeleton active paragraph={{ rows: 0 }} />
      ) : (
        <div className="content">
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
                {!disabledDelete && (
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
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default CardItem;
