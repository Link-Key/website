// Imports
import Link from "next/link"; // Local routing
import Layout from "@components/Layout"; // Layout wrapper
import {defaultBags} from "@utils/constants"; // Bags to render
import styles from "@styles/pages/Home.module.scss"; // Styles

// Types
import type {ReactElement} from "react";

export default function Home(): ReactElement {
    // Quicklinks to render
    const quicklinks: Record<string, string>[] = [
        {name: "OpenSea", url: "https://opensea.io/collection/lootproject"},
        {
            name: "Twitter",
            url: "https://twitter.com/lootproject",
        },
        {
            name: "Facebook",
            url: "https://twitter.com/lootproject",
        },
        {
            name: "Contract",
            url: "https://etherscan.io/address/0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7",
        },
    ];

    /**
     * LinkKey OpenSea link
     */
    const linkKeyOpenSeaLink = 'https://opensea.io/assets/0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7/';

    /**
     * Selects 3 random bags from defaultBags
     * @returns {Record<string, string>[]} randomized bags
     */
    const getRandomThreeBags = () => {
        const shuffled = defaultBags.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    };

    return (
        <Layout>
            <div>
                <div className={styles.home__cta}>
                    {/* CTA title */}
                    <h1>LinkKey</h1>

                    {/* Quicklinks */}
                    <ul>
                        {quicklinks.map(({name, url}, i) => {
                            return (
                                <li key={i}>
                                    {url.startsWith("/") ? (
                                        // If link to local page use Link
                                        <Link href={url}>
                                            <a>{name}</a>
                                        </Link>
                                    ) : (
                                        // Else, redirect in new tab
                                        <a href={url} target="_blank" rel="noopener noreferrer">
                                            {name}
                                        </a>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    {/* CTA Description */}
                    <p>
                        Loot is randomized adventurer gear generated and stored on chain.
                        <br/> Stats, images, and other functionality are intentionally
                        omitted for others to interpret. <br/> Feel free to use Loot in any
                        way you want.
                    </p>
                </div>

                {/* Rendering sample loot bags */}
                <div className={styles.home__feature}>
                    <span>Example Bags:</span>
                    {getRandomThreeBags().map(({id, attributes}, i) => (
                        // For each loot bag, render item and link to OpenSea
                        <a
                            href= {`${linkKeyOpenSeaLink}${id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={i}
                            className={styles.home__bag}
                        >
                            <div className={styles.home__bag_attributes}>
                                <span>#{id}</span>
                                <ul>
                                    {attributes.map((attribute, i) => (
                                        <li key={i}>
                                            <span>{attribute}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
