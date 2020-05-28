export default function HeaderContent() {
    return <div className="center-box">
        <h1>Discover</h1>

        <div className="search-boxes">
            <form className="search">
                <select name="sectors" id="sectors">
                    <option>Sectors</option>
                    <option>Sectors</option>
                    <option>Sectors</option>
                    <option>Sectors</option>
                    <option>Sectors</option>
                    <option>Sectors</option>
                </select>

                <select name="country" id="country">
                    <option>Country</option>
                    <option>Country</option>
                    <option>Country</option>
                    <option>Country</option>
                    <option>Country</option>
                    <option>Country</option>
                    <option>Country</option>
                </select>

                <select name="company-stage" id="company-stage">
                    <option>Company Stage</option>
                    <option>Company Stage</option>
                    <option>Company Stage</option>
                    <option>Company Stage</option>
                    <option>Company Stage</option>
                    <option>Company Stage</option>
                    <option>Company Stage</option>
                </select>

                <select name="ticket-size" id="ticket-size">
                    <option>Ticket Size</option>
                    <option>Ticket Size</option>
                    <option>Ticket Size</option>
                    <option>Ticket Size</option>
                    <option>Ticket Size</option>
                    <option>Ticket Size</option>
                    <option>Ticket Size</option>
                </select>

                <button className="button-search">Search <span><img src="images/icon/search.svg" /></span></button>
            </form>

        </div>
    </div>
}