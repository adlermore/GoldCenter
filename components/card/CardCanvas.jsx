"use client";

import IconShop from "@/public/icons/IconShop";
import React from "react";

function CardCanvas() {
  return (
    <>
      <div className="duration-300 cursor-pointer hover:opacity-70">
        <IconShop className="text-white [&>path]:fill-white" />
      </div>
      <div className="card_wrapper hidden">
        <div className="card_container">
          <div className="card_inner">
            <div className="card_header">
              <div className="card_close">x</div>
              <div className="card_title">Header Title</div>
              <div className="card_description">Header Description</div>
            </div>
            <div className="card_block">
              <div className="card_products"></div>
            </div>
            <div className="card_footer">
              <div className="card_title">Footer Title</div>
              <div className="card_description"> Footer Description</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardCanvas;
