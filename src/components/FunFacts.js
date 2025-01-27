import dynamic from "next/dynamic";

const Counter = dynamic(() => import("./Counter"), {
  ssr: false,
});

const FunFacts = () => {
  return (
    <section id="fun_facts">
      <div className="container">
        <div className="fn_cs_counter_list">
          <ul>
            <li>
              <div className="item">
                <h3 className="fn__gradient_title">
                  <span className="prefix" />
                  <Counter end={9999} />
                  <span className="suffix" />
                </h3>
                <p>Total Items</p>
                <div className="divider" />
              </div>
            </li>
            <li>
              <div className="item">
                <h3 className="fn__gradient_title">
                  <span className="prefix" />
                  <Counter end={3.9} decimals={2} />
                  <span className="suffix">k+</span>
                </h3>
                <p>Total Owners</p>
                <div className="divider" />
              </div>
            </li>
            <li>
              <div className="item">
                <h3 className="fn__gradient_title">
                  <span className="prefix" />
                  <Counter end={2.4} decimals={2} />
                  <span className="suffix" />
                </h3>
                <p>Floor Price (FLR)</p>
                <div className="divider" />
              </div>
            </li>
            <li>
              <div className="item">
                <h3 className="fn__gradient_title">
                  <span className="prefix" />
                  <Counter end={144} />
                  <span className="suffix">k+</span>
                </h3>
                <p>Volume Traded (FLR)</p>
                <div className="divider" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
export default FunFacts;
