

export default function Price({ price }) {
    return (
        <div className="price">
            <div className="price__column">
                <div className="price__value">{price.fee}</div>
                <h5 className="price__title">Excluding gas fee</h5>
            </div>
            <div className="price__column">
                <div className="price__value price__value--2">{price.value}</div>
                <h5 className="price__title">Price</h5>
            </div>
        </div>
    )
}
