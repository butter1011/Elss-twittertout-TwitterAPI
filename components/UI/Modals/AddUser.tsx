'use client'
import React, { useState } from 'react'
import { useContext } from 'react';
import axios from 'axios';

import { ToastContext } from '@/components/Contexts/ToastContext';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";

import { useAtom } from 'jotai';
import { isAddOpen } from '@/components/Jotai/modalAtoms';
import { tweetUsers } from '@/components/Jotai/atoms';

import { GoPerson } from "react-icons/go";

const AddUser = () => {
    const [isOpen, setOpen] = useAtom(isAddOpen);
    const [name, SetName] = useState("");
    const { toast } = useContext<any>(ToastContext);
    const [loading, setLoading] = useState<any>(false);
    const [userlist, setUserlist] = useAtom(tweetUsers);

    const init = () => {
        setOpen(false);
        setLoading(false);
        SetName("");
    }

    const onSave = async () => {
        setLoading(true);
        if (name == "") {
            init();
            toast.error("Input the username.")
            return;
        }

        axios.post("/api/v1/user/add", { new_user: name })
            .then((res) => {
                if (res.data?.status === 401) {
                    toast.error(res.data?.message);
                    init();
                    return;
                }
                setUserlist(res.data?.users);
                toast.success("Successfully Saved");
                init();
            })
            .catch((e) => {
                init();
                console.log(e);
            })
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => setOpen(false)} placement="auto" >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-black dark:text-white">
                                Twitter User Add
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    className='dark:text-white text-black'
                                    autoFocus
                                    endContent={
                                        <GoPerson className="text-2xl pointer-events-none flex-shrink-0 dark:text-white text-black" />
                                    }
                                    label="Username"
                                    placeholder="Enter the Twitter Username"
                                    variant="bordered"
                                    value={name}
                                    onChange={(e) => SetName(e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onSave}>
                                    {loading ?
                                        <div id="loading">
                                            <svg viewBox="10 10 20 20">
                                                <circle r="10" cy="20" cx="20"></circle>
                                            </svg>
                                        </div>
                                        : "Save"
                                    }
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddUser