/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useProduct } from "vtex.product-context";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import { applyModifiers } from "vtex.css-handles";
import { IconVisibilityOn } from "vtex.styleguide";


import styles from "./styles.css";

interface Props {
  displayIcon?: boolean;
  iconSize?: number;
  iconColor?: string;
  period?: string;
  blockClass?: string;
}

const Index = ({
  displayIcon = true,
  iconSize = 16,
  period = "month",
  iconColor = "#000000",
  blockClass = ""
}: Props) => {
  const product = useProduct();
  const [views, setViews] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    let cookieValue = '';
    const name = 'vtex_session'
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }

    if(cookieValue) {
      const body = {
        productId: product.product.productId,
        period,
        session: cookieValue
      };

      axios
          .post(`/page-views/process-views`, body)
          .then(response => {
            setViews(response.data.views);
            setLoading(false);
          })
          .catch(error => {
            console.log(error);
          });
    }
  }, [period, product.product.productId]);

  const message =
    views > 1 ? (
      <FormattedMessage
        id={"store/productViews.messagePlural"}
        values={{ views: views }}
      />
    ) : (
      <FormattedMessage
        id={"store/productViews.message"}
        values={{ views: views }}
      />
    );
  return (
    <div
      className={`${applyModifiers(styles.productViewsContainer, blockClass)}`}
    >
      {!loading && (
        <div
          className={`${applyModifiers(
            styles.productViewsContainer,
            blockClass
          )}`}
        >
          {displayIcon && (
            <IconVisibilityOn size={iconSize} color={iconColor} />
          )}{" "}
          <span className={`${styles.productViewsMessage}`}>{message}</span>
        </div>
      )}
    </div>
  );
};

export default Index;
