import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DownloadAttachment({ bugId }) {
    const [attachments, setAttachments] = useState([]);

    useEffect(() => {
        async function fetchBugDetails() {
            try {
                const response = await axios.get(`http://localhost:8080/bugs/${bugId}`);
                const fetchedAttachments = response.data.attachments.map((attachment, index) => ({
                    ...attachment,
                    url: byteArrayToBlobUrl(attachment.attachment),
                    extension: 'xlsx' // Assuming all are Excel files
                }));
                setAttachments(fetchedAttachments);
            } catch (error) {
                console.error('Failed to fetch bug details:', error);
            }
        }

        fetchBugDetails();
    }, [bugId]);

    function byteArrayToBlobUrl(byteArray) {
        const byteArrayInFormat = new Uint8Array(atob(byteArray).split('').map(char => char.charCodeAt(0)));
        const blob = new Blob([byteArrayInFormat], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        return URL.createObjectURL(blob);
    }

    return (
        <div>
            <h1>Download Attachments</h1>
            {attachments.map((attachment, index) => (
                <div key={index}>
                    <a href={attachment.url} download={`Attachment_${attachment.attachmentId}.${attachment.extension}`}>
                        Download Attachment {attachment.attachmentId}
                    </a>
                </div>
            ))}
        </div>
    );
}

export default DownloadAttachment;
