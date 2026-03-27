import * as React from 'react';
import { Player, BigPlayButton, ControlBar } from 'video-react';
import 'video-react/dist/video-react.css';
import './Video.css';

export interface VideoProps {
    /** The height of the video. */
    height?: number;
    /** The preload attribute of the video. */
    preload?: 'none' | 'metadata' | 'auto';
    /** The URL of the preview thumbnail. */
    previewThumbnail: string;
    /** The URL of the video. */
    videoUrl: string;
    /** The width of the video. */
    width?: number;
}

function Video(props: VideoProps): React.ReactElement {
    const { 
        height, 
        preload = 'none', 
        previewThumbnail, 
        videoUrl, 
        width 
    } = props;

  return width && height ? (
        // Laptop/desktop
        (width === 175 && height === 90) ||
        // Portrait iPhone 6/7/8
        (width === 155 && height === 90) ||
        // Portrait iPhone 6/7/8 Plus
        (width === 165 && height === 90) ||
        // Portrait iPad
        (width === 154 && height === 90) ||
        // Landscape iPad
        (width === 135 && height === 75) ? (
            <Player
                fluid={false}
                height={height}
                poster={previewThumbnail}
                preload={preload}
                src={videoUrl}
                width={width}
            >
                <BigPlayButton position="center" />
                <ControlBar autoHide={true} disableDefaultControls />
            </Player>
        ) : (
            <Player
                fluid={false}
                height={height}
                poster={previewThumbnail}
                preload={preload}
                src={videoUrl}
                width={width}
            >
                <BigPlayButton position="center" />
            </Player>
        )
    ) : (
        <Player poster={previewThumbnail} preload={preload} src={videoUrl}>
            <BigPlayButton position="center" />
        </Player>
    );
}

export default Video;
